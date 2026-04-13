#version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_cellScale;
uniform float u_warpStrength;
uniform float u_animSpeed;
uniform float u_edgeWidth;
uniform float u_innerDetail;
uniform float u_colorSpeed;
uniform float u_colorSaturation;
uniform float u_mouseInfluence;
uniform float u_brightness;

uniform sampler2D u_inputTexture;
uniform int u_hasInput;

out vec4 fragColor;

#include <noise.glsl>
#include <color-utils.glsl>

// Voronoi with F1, F2 distances and cell ID
vec4 voronoi(vec2 p, float t) {
    vec2 n = floor(p);
    vec2 f = fract(p);

    float f1 = 8.0;
    float f2 = 8.0;
    vec2 cellId = vec2(0.0);

    for (int j = -1; j <= 1; j++) {
        for (int i = -1; i <= 1; i++) {
            vec2 g = vec2(float(i), float(j));
            vec2 o = n + g;

            // Animated seed positions
            vec2 seed = vec2(
                snoise(o * 0.37 + t * 0.2) * 0.5 + 0.5,
                snoise(o * 0.51 + t * 0.15 + 100.0) * 0.5 + 0.5
            );

            vec2 diff = g + seed - f;
            float d = dot(diff, diff);

            if (d < f1) {
                f2 = f1;
                f1 = d;
                cellId = o;
            } else if (d < f2) {
                f2 = d;
            }
        }
    }

    f1 = sqrt(f1);
    f2 = sqrt(f2);

    return vec4(f1, f2, cellId);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = uv;
    p.x *= aspect;

    float t = u_time * u_animSpeed;

    // Domain warping with mouse influence
    vec2 mouseUV = vec2(u_mouse.x * aspect, u_mouse.y);
    float mouseDist = length(p - mouseUV);
    float mouseWarp = u_mouseInfluence * exp(-mouseDist * 3.0);

    // Primary warp
    vec2 warp1 = vec2(
        fbm(p * 1.5 + t * 0.15, 3, 2.0, 0.5),
        fbm(p * 1.5 + t * 0.12 + 50.0, 3, 2.0, 0.5)
    );
    p += warp1 * u_warpStrength;

    // Mouse-driven warp
    vec2 mouseDir = normalize(p - mouseUV + 0.001);
    p += mouseDir * mouseWarp * 0.5;

    // Primary Voronoi layer
    vec4 v1 = voronoi(p * u_cellScale, t);
    float f1 = v1.x;
    float f2 = v1.y;
    vec2 cell = v1.zw;

    // Edge detection from F2-F1
    float edge = smoothstep(u_edgeWidth, u_edgeWidth * 0.1, f2 - f1);

    // Inner detail layer
    vec2 innerP = p + vec2(f1 * 0.5, f2 * 0.3);
    vec4 v2 = voronoi(innerP * u_cellScale * 2.5, t * 0.7);
    float innerPattern = v2.x * u_innerDetail;

    // Cell-based color
    float cellHue = snoise(cell * 0.3 + t * u_colorSpeed * 0.1) * 0.5 + 0.5;
    cellHue += f1 * 0.3;
    vec3 cellColor = hsv2rgb(vec3(
        fract(cellHue),
        u_colorSaturation,
        0.7 + innerPattern * 0.3
    ));

    // Edge glow
    vec3 edgeColor = hsv2rgb(vec3(
        fract(cellHue + 0.5),
        0.6,
        1.0
    ));

    // Composite
    vec3 color = mix(cellColor, edgeColor, edge);
    color += innerPattern * 0.15;
    color *= u_brightness;

    // Vignette
    float vig = 1.0 - length(uv - 0.5) * 0.5;
    color *= vig;

    // Blend with input
    if (u_hasInput == 1) {
        vec4 inputColor = texture(u_inputTexture, uv);
        color = mix(inputColor.rgb, color, 0.75);
    }

    fragColor = vec4(color, 1.0);
}
