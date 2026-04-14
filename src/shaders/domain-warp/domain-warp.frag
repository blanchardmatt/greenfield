#version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_warpScale;
uniform float u_warpStrength;
uniform float u_warpLayers;
uniform float u_speed;
uniform float u_colorShift;
uniform float u_contrast;
uniform float u_patternScale;
uniform float u_mouseInfluence;
uniform float u_glowAmount;
uniform float u_brightness;
uniform int u_patternMode;

uniform sampler2D u_inputTexture;
uniform int u_hasInput;
uniform float u_warpInput;

out vec4 fragColor;

#include <noise.glsl>
#include <color-utils.glsl>

mat2 rot(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c, -s, s, c);
}

// Multi-layer domain warping
vec2 domainWarp(vec2 p, float t, vec2 mouseUV) {
    float str = u_warpStrength;

    // Mouse influence — local warp amplification
    float mDist = length(p - mouseUV);
    float mBoost = 1.0 + u_mouseInfluence * exp(-mDist * 2.0);

    for (float i = 0.0; i < 5.0; i++) {
        if (i >= u_warpLayers) break;

        // Each layer warps with different rotation and scale
        float angle = i * 0.7 + t * 0.1;
        vec2 offset = vec2(
            fbm(p * rot(angle) * (1.0 + i * 0.5) + t * (0.1 + i * 0.05), 3, 2.0, 0.5),
            fbm(p * rot(angle + 1.5) * (1.0 + i * 0.5) + t * (0.08 + i * 0.04) + 100.0, 3, 2.0, 0.5)
        );

        p += offset * str * mBoost;
        str *= 0.6; // Reduce each layer
    }

    return p;
}

// Pattern evaluation at warped coordinates
vec3 evaluatePattern(vec2 p, float t) {
    vec3 color;

    if (u_patternMode == 0) {
        // Geometric lattice
        vec2 grid = sin(p * u_patternScale) * cos(p.yx * u_patternScale * 0.7);
        float pattern = length(grid);
        float lines = abs(sin(p.x * u_patternScale * 2.0 + p.y * u_patternScale));
        pattern = mix(pattern, lines, 0.3);

        float hue = atan(p.y, p.x) / 6.28318 + u_colorShift + t * 0.02;
        color = palette(
            fract(hue + pattern * 0.3),
            vec3(0.5), vec3(0.5),
            vec3(1.0, 0.7, 0.4),
            vec3(0.0, 0.15, 0.2)
        );
        color *= (0.5 + pattern * u_contrast);
    } else if (u_patternMode == 1) {
        // Flowing ribbons
        float ribbon = 0.0;
        for (float i = 0.0; i < 6.0; i++) {
            float phase = i * 1.2 + t * 0.3;
            float wave = sin(p.x * (2.0 + i) + p.y * (1.5 + i * 0.5) + phase);
            ribbon += exp(-abs(wave) * (3.0 + u_contrast * 2.0));
        }
        ribbon = clamp(ribbon * 0.4, 0.0, 1.0);

        float hue = fract(ribbon * 0.5 + p.x * 0.1 + u_colorShift + t * 0.03);
        color = hsv2rgb(vec3(hue, 0.7, ribbon));
        color += exp(-abs(ribbon - 0.5) * 8.0) * u_glowAmount * 0.5;
    } else {
        // Crystal mosaic
        vec2 ip = floor(p * u_patternScale * 0.5);
        vec2 fp = fract(p * u_patternScale * 0.5) - 0.5;

        // Hexagonal-ish tiling
        float d1 = abs(fp.x) + abs(fp.y); // diamond
        float d2 = length(fp);             // circle
        float d = mix(d1, d2, 0.5 + sin(t + ip.x * 3.0 + ip.y * 5.0) * 0.5);

        float facet = smoothstep(0.5, 0.45, d);
        float edge = smoothstep(0.48, 0.5, d) * 0.8;

        float hue = fract(
            snoise(ip * 0.2 + t * 0.05) * 0.5 + 0.5
            + u_colorShift
        );
        color = hsv2rgb(vec3(hue, 0.6, 0.3 + facet * 0.7));
        color += edge * vec3(0.8, 0.9, 1.0) * u_glowAmount;
    }

    return color;
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = (uv - 0.5) * 2.0;
    p.x *= aspect;
    p *= u_warpScale;

    float t = u_time * u_speed;
    vec2 mouseUV = vec2((u_mouse.x - 0.5) * 2.0 * aspect, (u_mouse.y - 0.5) * 2.0) * u_warpScale;

    // Apply domain warping
    vec2 warped = domainWarp(p, t, mouseUV);

    // Evaluate the synthetic pattern at warped coordinates
    vec3 patternColor = evaluatePattern(warped, t);
    patternColor *= u_brightness;

    // Vignette
    float vig = 1.0 - length(uv - 0.5) * 0.6;
    patternColor *= vig;

    vec3 color = patternColor;
    if (u_hasInput == 1) {
        // Compute a UV offset from the difference between warped and unwarped
        // domain coords. Scale back to UV space (was multiplied by u_warpScale earlier).
        vec2 warpOffset = (warped - p) / u_warpScale * 0.5;
        // Sample the input texture at warped UVs — this distorts the actual image
        vec2 warpedUv = clamp(uv + warpOffset, vec2(0.0), vec2(1.0));
        vec3 warpedInput = texture(u_inputTexture, warpedUv).rgb;
        // u_warpInput controls the mix:
        //   1.0 = pure warped image (no synthetic pattern)
        //   0.0 = synthetic pattern blended with raw input (legacy behavior)
        vec3 blendedSynthetic = mix(texture(u_inputTexture, uv).rgb, patternColor, 0.75);
        color = mix(blendedSynthetic, warpedInput, u_warpInput);
    }

    fragColor = vec4(color, 1.0);
}
