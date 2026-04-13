#version 300 es
precision highp float;

in float v_life;

uniform vec4 u_colorBirth;
uniform vec4 u_colorDeath;
uniform int u_hasInput;
uniform sampler2D u_inputTexture;
uniform vec2 u_resolution;

out vec4 fragColor;

void main() {
    // Soft circle
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    if (dist > 0.5) discard;

    float alpha = smoothstep(0.5, 0.2, dist) * v_life;
    vec4 color = mix(u_colorDeath, u_colorBirth, v_life);
    color.a *= alpha;

    // Additive blending contribution
    fragColor = color;
}
