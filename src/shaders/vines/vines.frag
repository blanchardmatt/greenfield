#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_growSpeed;
uniform float u_curliness;
uniform float u_thickness;
uniform float u_leafSize;
uniform float u_mouseInfluence;
uniform int u_invertColors;
uniform float u_density;
uniform float u_branchAngle;

uniform sampler2D u_inputTexture;
uniform int u_hasInput;

out vec4 fragColor;

#include <noise.glsl>

// Fast line segment SDF
float seg(vec2 p, vec2 a, vec2 b, float w) {
    vec2 ba = b - a;
    float h = clamp(dot(p - a, ba) / dot(ba, ba), 0.0, 1.0);
    return length(p - a - ba * h) - w;
}

// Single flourish curve: accelerating spiral, returns SDF
float flourish(vec2 p, vec2 origin, float angle, float seed, float growth, float thick) {
    if (growth < 0.02) return 1e4;
    float d = 1e4;
    vec2 pos = origin;
    float a = angle;
    float curv = 0.0;
    float ca = u_curliness * 0.007;
    int n = int(growth * 22.0);

    for (int i = 0; i < 22; i++) {
        if (i >= n) break;
        float t = float(i) / 22.0;
        curv += ca * (0.3 + t * 2.0);
        curv += sin(float(i) * 0.4 + seed * 5.0) * 0.008;
        a += curv;

        // Mouse pull
        vec2 mp = u_mouse - pos;
        a += atan(mp.y, mp.x) * u_mouseInfluence * 0.006 * exp(-length(mp) * 5.0);

        float sl = 0.016 * (1.0 - t * 0.35);
        vec2 next = pos + vec2(cos(a), sin(a)) * sl;
        float w = thick * (1.0 - t * 0.85);
        d = min(d, seg(p, pos, next, max(w, 0.0004)));

        // Dots on outside of curve
        if (i > 1 && i % 5 == 0) {
            float da = a + sign(curv) * 1.571;
            vec2 dp = pos + vec2(cos(da), sin(da)) * thick * 3.5;
            d = min(d, length(p - dp) - thick * 0.6);
        }

        pos = next;
    }
    return d;
}

// Thinner branch
float branch(vec2 p, vec2 origin, float angle, float seed, float growth, float thick) {
    if (growth < 0.02) return 1e4;
    float d = 1e4;
    vec2 pos = origin;
    float a = angle;
    float curv = 0.0;
    float ca = -u_curliness * 0.006;
    int n = int(growth * 15.0);

    for (int i = 0; i < 15; i++) {
        if (i >= n) break;
        float t = float(i) / 15.0;
        curv += ca * (0.4 + t * 1.5);
        a += curv;
        float sl = 0.012 * (1.0 - t * 0.3);
        vec2 next = pos + vec2(cos(a), sin(a)) * sl;
        float w = thick * (1.0 - t * 0.9);
        d = min(d, seg(p, pos, next, max(w, 0.0003)));
        pos = next;
    }
    return d;
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = uv;
    p.x *= aspect;

    float d = 1e4;
    float t = u_time * u_growSpeed;
    float bw = u_thickness * 0.005; // base weight

    // --- Continuous growth: flourishes appear in waves ---
    // Wave 1: bottom-left corner (always present)
    float g1 = clamp(t * 0.4, 0.0, 1.0);
    vec2 o1 = vec2(0.05 * aspect, 0.02);
    d = min(d, flourish(p, o1, 1.15, 0.0, g1, bw));
    // Horizontal sweep from bottom-left
    d = min(d, flourish(p, vec2(0.02, 0.12), 0.2, 3.0, clamp((t - 0.5) * 0.35, 0.0, 1.0), bw * 0.9));
    // Branches
    if (t > 1.5) {
        vec2 bp1 = o1 + vec2(cos(1.15), sin(1.15)) * 0.14;
        d = min(d, branch(p, bp1, 1.15 + u_branchAngle, 1.0, clamp((t - 1.5) * 0.3, 0.0, 1.0), bw * 0.6));
        d = min(d, branch(p, bp1 + vec2(0.02, 0.04), 1.15 - u_branchAngle * 0.7, 2.0, clamp((t - 2.0) * 0.3, 0.0, 1.0), bw * 0.5));
    }

    // Wave 2: top-right corner
    if (t > 2.5) {
        float g2 = clamp((t - 2.5) * 0.35, 0.0, 1.0);
        vec2 o2 = vec2(aspect - 0.05, 0.98);
        d = min(d, flourish(p, o2, -1.95, 5.0, g2, bw * 0.9));
        if (t > 4.0) {
            vec2 bp2 = o2 + vec2(cos(-1.95), sin(-1.95)) * 0.12;
            d = min(d, branch(p, bp2, -1.95 - u_branchAngle, 6.0, clamp((t - 4.0) * 0.3, 0.0, 1.0), bw * 0.55));
        }
    }

    // Wave 3: right edge
    if (t > 4.5 && u_density > 0.3) {
        d = min(d, flourish(p, vec2(aspect, 0.4), 2.6, 7.0, clamp((t - 4.5) * 0.3, 0.0, 1.0), bw * 0.8));
    }

    // Wave 4: top-left
    if (t > 6.0 && u_density > 0.4) {
        d = min(d, flourish(p, vec2(0.02, 0.95), -0.3, 9.0, clamp((t - 6.0) * 0.3, 0.0, 1.0), bw * 0.75));
        if (t > 7.5) {
            vec2 bp4 = vec2(0.02, 0.95) + vec2(cos(-0.3), sin(-0.3)) * 0.1;
            d = min(d, branch(p, bp4, -0.3 + u_branchAngle, 10.0, clamp((t - 7.5) * 0.3, 0.0, 1.0), bw * 0.5));
        }
    }

    // Wave 5: bottom-right
    if (t > 8.0 && u_density > 0.5) {
        d = min(d, flourish(p, vec2(aspect * 0.7, 0.01), 1.5, 11.0, clamp((t - 8.0) * 0.3, 0.0, 1.0), bw * 0.85));
    }

    // Wave 6+: keep filling in
    if (t > 10.0 && u_density > 0.6) {
        d = min(d, flourish(p, vec2(aspect * 0.4, 0.0), 1.3, 13.0, clamp((t - 10.0) * 0.25, 0.0, 1.0), bw * 0.7));
        d = min(d, branch(p, vec2(aspect * 0.5, 1.0), -1.4, 14.0, clamp((t - 11.0) * 0.25, 0.0, 1.0), bw * 0.55));
    }

    if (t > 13.0 && u_density > 0.7) {
        d = min(d, flourish(p, vec2(0.0, 0.55), 0.1, 15.0, clamp((t - 13.0) * 0.25, 0.0, 1.0), bw * 0.65));
        d = min(d, flourish(p, vec2(aspect, 0.7), 3.0, 16.0, clamp((t - 14.0) * 0.25, 0.0, 1.0), bw * 0.6));
    }

    // Flower at first junction
    if (t > 2.5) {
        vec2 fp = o1 + vec2(cos(1.15), sin(1.15)) * 0.2;
        float fr = length(p - fp);
        float fa = atan(p.y - fp.y, p.x - fp.x);
        float flower = fr - u_leafSize * 0.015 * (0.6 + 0.4 * cos(fa * 5.0 + u_time * 0.2));
        d = min(d, flower);
        d = min(d, length(p - fp) - bw * u_thickness * 1.8); // center
    }

    // Anti-aliased edge
    float px = 1.5 / u_resolution.y;
    float shape = 1.0 - smoothstep(-px, px, d);

    float fg = u_invertColors == 1 ? 1.0 : 0.0;
    float bg = u_invertColors == 1 ? 0.0 : 1.0;
    vec3 color = vec3(mix(bg, fg, shape));

    if (u_hasInput == 1) {
        vec4 ic = texture(u_inputTexture, uv);
        color = mix(ic.rgb, vec3(fg), shape);
    }

    fragColor = vec4(color, 1.0);
}
