#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_decay;
uniform float u_zoom;
uniform float u_rotation;
uniform float u_colorShiftSpeed;
uniform float u_time;
uniform float u_blurAmount;
uniform vec4 u_tintColor;
uniform float u_tintStrength;
uniform float u_mirror;

uniform sampler2D u_prevFrame;
uniform sampler2D u_inputTexture;
uniform int u_hasInput;

out vec4 fragColor;

#include <color-utils.glsl>

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec2 center = vec2(0.5);

    // Apply zoom and rotation to sample previous frame
    vec2 p = uv - center;

    // Zoom toward center
    p *= u_zoom;

    // Rotate
    float s = sin(u_rotation);
    float c = cos(u_rotation);
    p = vec2(p.x * c - p.y * s, p.x * s + p.y * c);

    // Mirror
    if (u_mirror > 0.5) {
        p = abs(p);
    }

    p += center;

    // Sample previous frame with slight blur
    vec4 prev = vec4(0.0);
    if (u_blurAmount > 0.001) {
        vec2 texel = 1.0 / u_resolution;
        float b = u_blurAmount;
        prev += texture(u_prevFrame, p) * 0.4;
        prev += texture(u_prevFrame, p + vec2(texel.x * b, 0.0)) * 0.15;
        prev += texture(u_prevFrame, p - vec2(texel.x * b, 0.0)) * 0.15;
        prev += texture(u_prevFrame, p + vec2(0.0, texel.y * b)) * 0.15;
        prev += texture(u_prevFrame, p - vec2(0.0, texel.y * b)) * 0.15;
    } else {
        prev = texture(u_prevFrame, p);
    }

    // Decay
    prev *= u_decay;

    // Color shift
    if (u_colorShiftSpeed > 0.001) {
        vec3 hsv = rgb2hsv(prev.rgb);
        hsv.x = fract(hsv.x + u_colorShiftSpeed * 0.01);
        prev.rgb = hsv2rgb(hsv);
    }

    // Tint
    prev.rgb = mix(prev.rgb, u_tintColor.rgb * prev.a, u_tintStrength);

    // Composite with input
    vec4 color = prev;
    if (u_hasInput == 1) {
        vec4 inputColor = texture(u_inputTexture, uv);
        // Additive blend the input on top of the feedback
        color.rgb = max(color.rgb, inputColor.rgb);
        color.a = max(color.a, inputColor.a);
    }

    fragColor = color;
}
