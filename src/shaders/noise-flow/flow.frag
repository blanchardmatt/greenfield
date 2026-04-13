#version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_speed;
uniform float u_scale;
uniform int u_octaves;
uniform float u_lacunarity;
uniform float u_gain;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform float u_mouseInfluence;
uniform float u_distortion;
uniform float u_brightness;

uniform sampler2D u_inputTexture;
uniform int u_hasInput;

out vec4 fragColor;

#include <noise.glsl>

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec2 p = uv * u_scale;

    // Mouse influence — distort the noise space
    vec2 mouseUV = u_mouse;
    float mouseDist = length(uv - mouseUV);
    float mouseEffect = u_mouseInfluence * exp(-mouseDist * 4.0);
    p += mouseEffect * (uv - mouseUV) * u_distortion;

    // Animated FBM noise
    float t = u_time * u_speed;
    float n1 = fbm(p + vec2(t * 0.3, t * 0.1), u_octaves, u_lacunarity, u_gain);
    float n2 = fbm(p + vec2(n1 * 1.5, t * 0.2), u_octaves, u_lacunarity, u_gain);

    // Flow distortion
    float flow = fbm(p + vec2(n2 * u_distortion, n1 * u_distortion) + vec2(t * 0.1), u_octaves, u_lacunarity, u_gain);

    // Map to color
    float val = flow * 0.5 + 0.5;
    val = clamp(val * u_brightness, 0.0, 1.0);
    vec4 color = mix(u_color1, u_color2, val);

    // Add subtle iridescence
    float hueShift = snoise(p * 0.5 + t * 0.05) * 0.1;
    color.rgb = mix(color.rgb, color.gbr, hueShift + 0.5);

    // Blend with input texture if present
    if (u_hasInput == 1) {
        vec4 inputColor = texture(u_inputTexture, uv);
        color = mix(inputColor, color, 0.7);
    }

    fragColor = color;
}
