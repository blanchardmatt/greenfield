#version 300 es
precision highp float;

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

// SDF: line segment with radius
float sdSeg(vec2 p, vec2 a, vec2 b, float r) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h) - r;
}

// SDF: circle
float sdCircle(vec2 p, vec2 c, float r) {
    return length(p - c) - r;
}

// SDF: pointed leaf (rotated ellipse, pinched)
float sdLeaf(vec2 p, vec2 center, float angle, float size) {
    vec2 d = p - center;
    float c = cos(angle), s = sin(angle);
    d = vec2(d.x * c + d.y * s, -d.x * s + d.y * c);
    // Pinched ellipse
    float ex = d.x / (size * 0.6);
    float ey = d.y / (size * 0.2);
    // Taper toward tip
    ey *= 1.0 + abs(d.x) / (size * 0.3);
    return length(vec2(ex, ey)) - 1.0;
}

// SDF: small flower (5 petals)
float sdFlower(vec2 p, vec2 center, float size, float angle) {
    vec2 d = p - center;
    float c = cos(angle), s = sin(angle);
    d = vec2(d.x * c + d.y * s, -d.x * s + d.y * c);
    float r = length(d);
    float a = atan(d.y, d.x);
    // 5-petal flower
    float petal = cos(a * 5.0) * 0.35 + 0.65;
    return r - size * petal;
}

// Trace a decorative flourish with spiral tips
// Returns min SDF distance
float traceFlourish(vec2 uv, vec2 origin, float baseAngle, float seed,
                    float startTime, float maxLen, float baseThick) {
    float d = 1e6;
    float t = u_time * u_growSpeed;
    float growth = clamp((t - startTime) * 0.4, 0.0, 1.0);
    if (growth < 0.01) return d;

    int totalSegs = int(growth * maxLen);
    vec2 pos = origin;
    float angle = baseAngle;

    // Curvature: starts gentle, increases toward tip (creates spiral)
    float curvature = 0.0;
    float curvatureAccel = u_curliness * 0.006;

    float thick = baseThick * u_thickness;

    for (int i = 0; i < 50; i++) {
        if (i >= totalSegs) break;
        float fi = float(i);
        float progress = fi / maxLen;

        // Accelerating curvature = spiral at the tip
        curvature += curvatureAccel * (0.3 + progress * 1.5);
        // Add subtle S-curve variation
        curvature += sin(fi * 0.3 + seed * 7.0) * 0.01;

        angle += curvature;

        // Mouse influence — gentle pull
        vec2 toM = u_mouse - pos;
        float mDist = length(toM);
        if (mDist > 0.01) {
            float pull = u_mouseInfluence * 0.008 * exp(-mDist * 4.0);
            angle += atan(toM.y, toM.x) * pull;
        }

        // Segment length shortens as we spiral tighter
        float segLen = 0.014 * (1.0 - progress * 0.4);
        vec2 next = pos + vec2(cos(angle), sin(angle)) * segLen;

        // Taper: thick base → thin tip
        float w = thick * (1.0 - progress * 0.85);
        w = max(w, 0.0005);

        d = min(d, sdSeg(uv, pos, next, w));

        // Decorative dots along the outside of curves
        if (fi > 2.0 && mod(fi, 6.0) < 1.0) {
            float dotSide = sign(curvature);
            float dotAngle = angle + dotSide * 1.5708;
            float dotDist = thick * 3.0 * (1.0 - progress * 0.5);
            vec2 dotPos = pos + vec2(cos(dotAngle), sin(dotAngle)) * dotDist;
            float dotR = thick * 0.5 * (1.0 - progress * 0.6);
            d = min(d, sdCircle(uv, dotPos, dotR));

            // Sometimes add smaller trailing dots
            if (mod(fi, 12.0) < 1.0) {
                for (int j = 1; j < 3; j++) {
                    vec2 trailDot = dotPos + vec2(cos(dotAngle), sin(dotAngle)) * float(j) * dotR * 2.5;
                    d = min(d, sdCircle(uv, trailDot, dotR * (0.6 - float(j) * 0.15)));
                }
            }
        }

        // Pointed leaves
        if (u_leafSize > 0.01 && fi > 3.0 && mod(fi + seed * 10.0, 8.0) < 1.0) {
            float side = mod(fi, 16.0) < 8.0 ? 1.0 : -1.0;
            float la = angle + side * (1.0 + u_branchAngle * 0.5);
            vec2 leafBase = pos + vec2(cos(la), sin(la)) * thick * 2.0;
            float lSize = u_leafSize * 0.02 * (1.0 - progress * 0.5);
            float leafD = sdLeaf(uv, leafBase, la, lSize);
            d = min(d, leafD * lSize * 0.3);
        }

        pos = next;
    }

    return d;
}

// A counter-curling sub-flourish (S-curve effect)
float traceSubFlourish(vec2 uv, vec2 origin, float baseAngle, float seed,
                       float startTime, float maxLen, float baseThick) {
    float d = 1e6;
    float t = u_time * u_growSpeed;
    float growth = clamp((t - startTime) * 0.35, 0.0, 1.0);
    if (growth < 0.01) return d;

    int totalSegs = int(growth * maxLen);
    vec2 pos = origin;
    float angle = baseAngle;
    float curvature = 0.0;
    // Opposite curl direction for visual variety
    float curvatureAccel = -u_curliness * 0.005;
    float thick = baseThick * u_thickness * 0.6;

    for (int i = 0; i < 30; i++) {
        if (i >= totalSegs) break;
        float fi = float(i);
        float progress = fi / maxLen;

        curvature += curvatureAccel * (0.4 + progress * 1.2);
        angle += curvature;

        float segLen = 0.011 * (1.0 - progress * 0.3);
        vec2 next = pos + vec2(cos(angle), sin(angle)) * segLen;
        float w = thick * (1.0 - progress * 0.9);
        w = max(w, 0.0003);

        d = min(d, sdSeg(uv, pos, next, w));

        // Small dots
        if (mod(fi, 5.0) < 1.0 && fi > 1.0) {
            float dotAngle = angle + sign(curvature) * 1.5708;
            float dotDist = thick * 2.5;
            vec2 dotPos = pos + vec2(cos(dotAngle), sin(dotAngle)) * dotDist;
            d = min(d, sdCircle(uv, dotPos, thick * 0.35));
        }

        pos = next;
    }
    return d;
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = uv;
    p.x *= aspect;

    float d = 1e6;
    float t = u_time * u_growSpeed;
    float baseThick = 0.004;

    // === Bottom-left corner: main composition ===

    // Primary S-curve trunk rising from bottom-left
    vec2 o1 = vec2(0.05 * aspect, 0.0);
    d = min(d, traceFlourish(p, o1, 1.2, 0.0, 0.0, 40.0, baseThick));
    // Counter-curl branch
    if (t > 1.0) {
        vec2 bp1 = o1 + vec2(cos(1.2), sin(1.2)) * 0.18;
        d = min(d, traceSubFlourish(p, bp1, 1.2 + u_branchAngle, 1.0, 1.0, 25.0, baseThick));
    }
    // Second counter-curl
    if (t > 1.8) {
        vec2 bp2 = o1 + vec2(cos(1.2), sin(1.2)) * 0.30;
        d = min(d, traceSubFlourish(p, bp2, 1.2 - u_branchAngle * 0.8, 2.0, 1.8, 20.0, baseThick));
    }

    // Horizontal flourish sweeping right from bottom
    d = min(d, traceFlourish(p, vec2(0.0, 0.15), 0.15, 3.0, 0.3, 35.0, baseThick * 0.9));
    if (t > 1.5) {
        vec2 bp3 = vec2(0.0, 0.15) + vec2(cos(0.15), sin(0.15)) * 0.22;
        d = min(d, traceSubFlourish(p, bp3, 0.15 + 1.2, 4.0, 1.5, 22.0, baseThick));
    }

    // === Top-right corner (if density allows) ===
    if (u_density > 0.3) {
        vec2 o3 = vec2(aspect * 0.95, 1.0);
        d = min(d, traceFlourish(p, o3, -1.9, 5.0, 2.0, 35.0, baseThick * 0.85));
        if (t > 3.0) {
            vec2 bp4 = o3 + vec2(cos(-1.9), sin(-1.9)) * 0.15;
            d = min(d, traceSubFlourish(p, bp4, -1.9 - u_branchAngle, 6.0, 3.0, 20.0, baseThick));
        }
    }

    // Small accent flourishes
    if (u_density > 0.5) {
        d = min(d, traceFlourish(p, vec2(0.0, 0.35), 0.4, 7.0, 2.5, 20.0, baseThick * 0.5));
    }

    // Flower at junction point
    if (t > 2.0) {
        vec2 flowerPos = o1 + vec2(cos(1.2), sin(1.2)) * 0.25;
        float flowerD = sdFlower(p, flowerPos, u_leafSize * 0.018, u_time * 0.1);
        d = min(d, flowerD);
        // Flower center dot
        d = min(d, sdCircle(p, flowerPos, baseThick * u_thickness * 1.5));
    }

    // Anti-aliased rendering
    float px = 1.5 / u_resolution.y;
    float shape = 1.0 - smoothstep(-px * 0.5, px, d);

    // Color
    float fg = u_invertColors == 1 ? 1.0 : 0.0;
    float bg = u_invertColors == 1 ? 0.0 : 1.0;
    float lum = mix(bg, fg, shape);
    vec3 color = vec3(lum);

    if (u_hasInput == 1) {
        vec4 inputColor = texture(u_inputTexture, uv);
        color = mix(inputColor.rgb, vec3(fg), shape);
    }

    fragColor = vec4(color, 1.0);
}
