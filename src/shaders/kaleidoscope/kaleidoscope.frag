#version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform int u_segments;
uniform float u_rotation;
uniform float u_zoom;
uniform float u_spiralAmount;
uniform float u_colorCycle;
uniform float u_mouseInfluence;
uniform float u_patternSpeed;
uniform int u_patternType;
uniform float u_brightness;

uniform sampler2D u_inputTexture;
uniform int u_hasInput;

out vec4 fragColor;

#include <noise.glsl>
#include <color-utils.glsl>

vec3 generatePattern(vec2 p, float t) {
    vec3 col;

    if (u_patternType == 0) {
        // Flowing plasma
        float n = fbm(p * 2.0 + t * 0.3, 4, 2.0, 0.5);
        float n2 = fbm(p * 3.0 - t * 0.2 + n, 3, 2.0, 0.5);
        col = palette(
            n2 * 0.5 + 0.5 + u_colorCycle * t * 0.1,
            vec3(0.5), vec3(0.5), vec3(1.0, 1.0, 0.5), vec3(0.8, 0.9, 0.3)
        );
    } else if (u_patternType == 1) {
        // Electric rings
        float r = length(p);
        float a = atan(p.y, p.x);
        float ring = sin(r * 10.0 - t * 2.0 + sin(a * 3.0) * 2.0);
        float n = snoise(p * 3.0 + t * 0.5);
        col = palette(
            ring * 0.5 + 0.5 + n * 0.2 + u_colorCycle * t * 0.1,
            vec3(0.5), vec3(0.5), vec3(1.0, 0.7, 0.4), vec3(0.0, 0.15, 0.2)
        );
        col *= 0.8 + ring * 0.4;
    } else {
        // Cellular
        vec2 ip = floor(p * 4.0);
        vec2 fp = fract(p * 4.0);
        float minDist = 1.0;
        for (int y = -1; y <= 1; y++) {
            for (int x = -1; x <= 1; x++) {
                vec2 neighbor = vec2(float(x), float(y));
                vec2 point = vec2(
                    snoise(ip + neighbor + t * 0.2) * 0.5 + 0.5,
                    snoise(ip + neighbor + t * 0.2 + 100.0) * 0.5 + 0.5
                );
                float d = length(fp - neighbor - point);
                minDist = min(minDist, d);
            }
        }
        col = palette(
            minDist + u_colorCycle * t * 0.1,
            vec3(0.5), vec3(0.5), vec3(2.0, 1.0, 0.0), vec3(0.5, 0.2, 0.25)
        );
    }

    return col;
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;

    // Center and correct aspect ratio
    vec2 p = (uv - 0.5) * 2.0;
    p.x *= aspect;

    // Mouse influence
    vec2 mouseOffset = (u_mouse - 0.5) * u_mouseInfluence;
    p += mouseOffset;

    // Convert to polar
    float r = length(p);
    float a = atan(p.y, p.x);

    // Apply rotation
    a += u_rotation * u_time * 0.5;

    // Spiral distortion
    a += r * u_spiralAmount;

    // Kaleidoscope: fold angle into segment
    float segAngle = 3.14159265 * 2.0 / float(u_segments);
    a = mod(a, segAngle);
    // Mirror every other segment
    if (mod(floor(a / segAngle * float(u_segments)), 2.0) > 0.5) {
        a = segAngle - a;
    }
    a = abs(a);

    // Convert back to cartesian for pattern generation
    vec2 kp = vec2(cos(a), sin(a)) * r * u_zoom;

    float t = u_time * u_patternSpeed;
    vec3 color = generatePattern(kp, t);
    color *= u_brightness;

    // Vignette
    float vig = 1.0 - r * 0.3;
    color *= vig;

    // Blend with input if present
    if (u_hasInput == 1) {
        vec4 inputColor = texture(u_inputTexture, uv);
        color = mix(inputColor.rgb, color, 0.7);
    }

    fragColor = vec4(color, 1.0);
}
