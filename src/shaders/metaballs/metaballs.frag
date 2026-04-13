#version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform int u_blobCount;
uniform float u_smoothBlend;
uniform float u_roughness;
uniform float u_specularPower;
uniform float u_fresnelStrength;
uniform float u_animSpeed;
uniform float u_mouseInfluence;
uniform vec4 u_baseColor;
uniform vec4 u_specColor;
uniform float u_ambientOcclusion;
uniform float u_envReflect;

uniform sampler2D u_inputTexture;
uniform int u_hasInput;

out vec4 fragColor;

#include <noise.glsl>

// Smooth minimum for blending SDFs
float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
}

// Scene SDF
float sceneSDF(vec3 p) {
    float t = u_time * u_animSpeed;
    float d = 1e6;

    // Mouse-controlled primary blob
    vec3 mousePos = vec3((u_mouse.x - 0.5) * 3.0, (u_mouse.y - 0.5) * 2.0, 0.0);

    for (int i = 0; i < 8; i++) {
        if (i >= u_blobCount) break;
        float fi = float(i);

        vec3 center;
        if (i == 0) {
            // Primary blob follows mouse
            center = mousePos * u_mouseInfluence;
        } else {
            // Orbiting blobs
            float phase = fi * 1.618 * 6.28318;
            float orbitRadius = 1.0 + fi * 0.3;
            center = vec3(
                sin(t * 0.4 + phase) * orbitRadius,
                cos(t * 0.5 + phase * 0.7) * orbitRadius * 0.7,
                sin(t * 0.3 + phase * 1.3) * orbitRadius * 0.5
            );

            // Attract toward mouse
            center = mix(center, mousePos, u_mouseInfluence * 0.15 * exp(-length(center - mousePos) * 0.5));
        }

        // Varying radius per blob
        float radius = 0.5 + sin(t * 0.6 + fi * 2.0) * 0.15;
        radius += snoise(vec2(fi * 7.0, t * 0.3)) * 0.1;

        float sphereDist = length(p - center) - radius;

        // Surface roughness
        if (u_roughness > 0.01) {
            sphereDist += snoise(vec2(p.x * 3.0 + p.y, p.z * 3.0 + t * 0.5)) * u_roughness * 0.1;
        }

        d = smin(d, sphereDist, u_smoothBlend);
    }

    // Ground plane (subtle)
    float ground = p.y + 2.0;
    d = smin(d, ground, 0.8);

    return d;
}

vec3 calcNormal(vec3 p) {
    const float e = 0.001;
    return normalize(vec3(
        sceneSDF(p + vec3(e, 0, 0)) - sceneSDF(p - vec3(e, 0, 0)),
        sceneSDF(p + vec3(0, e, 0)) - sceneSDF(p - vec3(0, e, 0)),
        sceneSDF(p + vec3(0, 0, e)) - sceneSDF(p - vec3(0, 0, e))
    ));
}

float calcAO(vec3 p, vec3 n) {
    float ao = 0.0;
    float scale = 1.0;
    for (int i = 0; i < 5; i++) {
        float dist = 0.05 + 0.1 * float(i);
        float d = sceneSDF(p + n * dist);
        ao += (dist - d) * scale;
        scale *= 0.5;
    }
    return clamp(1.0 - ao * u_ambientOcclusion * 3.0, 0.0, 1.0);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 screenPos = (uv - 0.5) * 2.0;
    screenPos.x *= aspect;

    // Camera
    vec3 ro = vec3(0.0, 0.5, -4.5);
    vec3 rd = normalize(vec3(screenPos, 1.8));

    // Slight camera sway
    float camSway = u_time * 0.1;
    float cs = cos(camSway * 0.3);
    float ss = sin(camSway * 0.3);
    rd.xz = mat2(cs, -ss, ss, cs) * rd.xz;

    // Raymarch
    float t = 0.0;
    float d;
    bool hit = false;
    for (int i = 0; i < 128; i++) {
        d = sceneSDF(ro + rd * t);
        if (d < 0.001) {
            hit = true;
            break;
        }
        t += d * 0.8;
        if (t > 50.0) break;
    }

    vec3 color;

    if (hit) {
        vec3 p = ro + rd * t;
        vec3 n = calcNormal(p);

        // Lighting
        vec3 lightDir1 = normalize(vec3(0.6, 0.8, -0.5));
        vec3 lightDir2 = normalize(vec3(-0.4, 0.3, 0.8));
        vec3 viewDir = -rd;

        // Diffuse
        float diff1 = max(0.0, dot(n, lightDir1));
        float diff2 = max(0.0, dot(n, lightDir2)) * 0.3;

        // Specular (Blinn-Phong)
        vec3 h1 = normalize(lightDir1 + viewDir);
        float spec1 = pow(max(0.0, dot(n, h1)), u_specularPower);
        vec3 h2 = normalize(lightDir2 + viewDir);
        float spec2 = pow(max(0.0, dot(n, h2)), u_specularPower * 0.5) * 0.3;

        // Fresnel
        float fresnel = pow(1.0 - max(0.0, dot(n, viewDir)), 3.0) * u_fresnelStrength;

        // AO
        float ao = calcAO(p, n);

        // Iridescent base color
        float iridescence = dot(n, viewDir) * 0.5 + 0.5;
        vec3 baseCol = u_baseColor.rgb;
        baseCol = mix(baseCol, baseCol.gbr, iridescence * 0.3);

        // Compose
        color = baseCol * (diff1 + diff2) * 0.6;
        color += u_specColor.rgb * (spec1 + spec2);
        color += fresnel * mix(u_specColor.rgb, vec3(1.0), 0.5);

        // Environment reflection
        vec3 reflDir = reflect(rd, n);
        float envLight = max(0.0, reflDir.y) * 0.5 + 0.5;
        color += envLight * u_envReflect * baseCol * 0.3;

        color *= ao;

        // Depth fog
        float fog = exp(-t * 0.08);
        color = mix(vec3(0.02, 0.02, 0.05), color, fog);

    } else {
        // Background gradient
        color = mix(vec3(0.02, 0.02, 0.05), vec3(0.05, 0.03, 0.1), uv.y);

        // Subtle background glow near blobs
        float glowDist = sceneSDF(ro + rd * 3.0);
        float glow = exp(-glowDist * 2.0) * 0.15;
        color += u_baseColor.rgb * glow;
    }

    if (u_hasInput == 1) {
        vec4 inputColor = texture(u_inputTexture, uv);
        color = mix(inputColor.rgb, color, 0.8);
    }

    // Tone mapping
    color = color / (color + 1.0);
    // Gamma
    color = pow(color, vec3(0.9));

    fragColor = vec4(color, 1.0);
}
