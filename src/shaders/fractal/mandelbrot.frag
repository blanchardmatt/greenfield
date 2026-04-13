#version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_zoom;
uniform vec2 u_center;
uniform int u_maxIterations;
uniform float u_escapeRadius;
uniform float u_colorSpeed;
uniform float u_colorOffset;
uniform vec4 u_innerColor;
uniform float u_mouseInfluence;
uniform int u_juliaMode;
uniform vec2 u_juliaC;
uniform float u_power;

uniform sampler2D u_inputTexture;
uniform int u_hasInput;

out vec4 fragColor;

#include <color-utils.glsl>

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;

    // Map UV to complex plane
    vec2 c;
    vec2 z;

    vec2 pos = (uv - 0.5) * 2.0;
    pos.x *= aspect;
    pos /= u_zoom;
    pos += u_center;

    // Mouse influence - shift the view
    vec2 mouseShift = (u_mouse - 0.5) * u_mouseInfluence / u_zoom;
    pos += mouseShift;

    if (u_juliaMode == 1) {
        z = pos;
        c = u_juliaC;
    } else {
        z = vec2(0.0);
        c = pos;
    }

    // Iterate
    float iter = 0.0;
    for (int i = 0; i < 1000; i++) {
        if (i >= u_maxIterations) break;
        if (dot(z, z) > u_escapeRadius * u_escapeRadius) break;

        // z = z^power + c (generalized)
        if (u_power == 2.0) {
            z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
        } else {
            float r = length(z);
            float theta = atan(z.y, z.x);
            float rn = pow(r, u_power);
            float tn = theta * u_power;
            z = vec2(rn * cos(tn), rn * sin(tn)) + c;
        }
        iter += 1.0;
    }

    vec4 color;
    if (iter >= float(u_maxIterations)) {
        color = u_innerColor;
    } else {
        // Smooth iteration count
        float smoothIter = iter - log2(log2(dot(z, z))) + 4.0;
        float t = smoothIter * u_colorSpeed * 0.01 + u_colorOffset + u_time * 0.05;

        // Palette-based coloring
        vec3 col = palette(
            fract(t),
            vec3(0.5, 0.5, 0.5),
            vec3(0.5, 0.5, 0.5),
            vec3(1.0, 1.0, 1.0),
            vec3(0.0, 0.33, 0.67)
        );
        color = vec4(col, 1.0);
    }

    if (u_hasInput == 1) {
        vec4 inputColor = texture(u_inputTexture, uv);
        color = mix(inputColor, color, 0.8);
    }

    fragColor = color;
}
