#version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_growSpeed;
uniform float u_branchChance;
uniform float u_curliness;
uniform float u_thickness;
uniform float u_leafSize;
uniform float u_leafDensity;
uniform float u_fadeTrail;
uniform float u_mouseInfluence;
uniform int u_invertColors;
uniform float u_complexity;

uniform sampler2D u_inputTexture;
uniform int u_hasInput;

out vec4 fragColor;

#include <noise.glsl>

// SDF for a line segment
float sdSegment(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h);
}

// Leaf shape SDF
float sdLeaf(vec2 p, vec2 pos, float angle, float size) {
    vec2 d = p - pos;
    float c = cos(angle), s = sin(angle);
    d = vec2(d.x * c + d.y * s, -d.x * s + d.y * c);
    // Teardrop shape
    float r = length(d / vec2(size * 0.4, size));
    r -= 0.5 + d.y / (size * 3.0);
    return r;
}

// Generate a vine branch using noise-driven path
float vine(vec2 uv, float seed, float startTime, vec2 origin, float baseAngle) {
    float d = 1e6;
    float t = u_time * u_growSpeed;
    float growth = clamp((t - startTime) * 0.5, 0.0, 1.0);

    // Number of segments visible
    int maxSegs = int(growth * 40.0 * u_complexity);

    vec2 pos = origin;
    float angle = baseAngle;
    float segLen = 0.02;
    float thickness = u_thickness * 0.008;

    for (int i = 0; i < 80; i++) {
        if (i >= maxSegs) break;

        float fi = float(i);
        float progress = fi / 40.0;

        // Curl the vine using noise
        float curl = snoise(vec2(fi * 0.15 + seed, startTime * 0.3)) * u_curliness;

        // Mouse influence — bend toward mouse
        vec2 toMouse = u_mouse - pos;
        float mouseDist = length(toMouse);
        float mouseEffect = u_mouseInfluence * exp(-mouseDist * 4.0) * 0.5;
        float mouseAngle = atan(toMouse.y, toMouse.x);
        float angleDiff = mouseAngle - angle;
        // Normalize angle difference
        angleDiff = mod(angleDiff + 3.14159, 6.28318) - 3.14159;
        angle += angleDiff * mouseEffect;

        angle += curl * 0.15;

        vec2 nextPos = pos + vec2(cos(angle), sin(angle)) * segLen;

        // Taper thickness along the vine
        float taper = thickness * (1.0 - progress * 0.6);
        float segDist = sdSegment(uv, pos, nextPos) - taper;
        d = min(d, segDist);

        // Leaves
        if (u_leafSize > 0.01 && mod(fi, max(1.0, 5.0 - u_leafDensity * 4.0)) < 1.0 && fi > 3.0) {
            float leafAngle = angle + (snoise(vec2(fi + seed, 0.0)) > 0.0 ? 1.2 : -1.2);
            float lSize = u_leafSize * 0.03 * (0.5 + snoise(vec2(fi * 0.5, seed)) * 0.5);
            float leafD = sdLeaf(uv, pos, leafAngle, lSize);
            d = min(d, leafD * 0.8);
        }

        pos = nextPos;
    }

    return d;
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = uv;
    p.x *= aspect;

    float t = u_time * u_growSpeed;

    // Multiple vine sources
    float d = 1e6;

    // Bottom vines growing upward
    d = min(d, vine(p, 0.0, 0.0, vec2(0.2 * aspect, 0.0), 1.3));
    d = min(d, vine(p, 1.7, 0.5, vec2(0.7 * aspect, 0.0), 1.5));
    d = min(d, vine(p, 3.1, 1.0, vec2(0.5 * aspect, 0.0), 1.4));

    // Side vines
    d = min(d, vine(p, 4.5, 1.5, vec2(0.0, 0.3), 0.2));
    d = min(d, vine(p, 6.2, 2.0, vec2(aspect, 0.6), 2.9));

    // Top vines growing downward
    d = min(d, vine(p, 7.8, 2.5, vec2(0.3 * aspect, 1.0), -1.3));
    d = min(d, vine(p, 9.1, 3.0, vec2(0.8 * aspect, 1.0), -1.6));

    // Extra complexity vines
    if (u_complexity > 0.5) {
        d = min(d, vine(p, 10.5, 3.5, vec2(0.0, 0.7), 0.3));
        d = min(d, vine(p, 11.9, 4.0, vec2(aspect, 0.3), 2.8));
    }

    // Anti-aliased rendering
    float px = 1.0 / u_resolution.y;
    float vineShape = 1.0 - smoothstep(-px, px * 1.5, d);

    // Subtle inner glow / depth
    float innerGlow = exp(-max(d, 0.0) * 200.0) * 0.3;
    vineShape += innerGlow;

    // Fade trail effect — older parts slightly fade
    vineShape *= (1.0 - u_fadeTrail * 0.3);

    // Color
    vec3 fg = vec3(1.0);
    vec3 bg = vec3(0.0);

    if (u_invertColors == 1) {
        fg = vec3(0.0);
        bg = vec3(1.0);
    }

    vec3 color = mix(bg, fg, clamp(vineShape, 0.0, 1.0));

    // Blend with input
    if (u_hasInput == 1) {
        vec4 inputColor = texture(u_inputTexture, uv);
        // Use vine as mask over input
        color = mix(inputColor.rgb, fg, clamp(vineShape, 0.0, 1.0));
    }

    fragColor = vec4(color, 1.0);
}
