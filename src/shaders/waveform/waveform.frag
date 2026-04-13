#version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_audioLevel;
uniform float u_bassLevel;
uniform float u_midLevel;
uniform float u_trebleLevel;
uniform float u_lineWidth;
uniform float u_glowIntensity;
uniform float u_waveAmplitude;
uniform float u_waveSpeed;
uniform int u_waveCount;
uniform float u_colorCycle;
uniform float u_mouseInfluence;
uniform int u_visualMode;

uniform sampler2D u_inputTexture;
uniform int u_hasInput;

out vec4 fragColor;

#include <noise.glsl>
#include <color-utils.glsl>

float sdLine(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = uv;

    // Mouse influence
    p += (u_mouse - 0.5) * u_mouseInfluence * 0.1;

    vec3 totalColor = vec3(0.0);
    float audioBoost = 1.0 + u_audioLevel * 2.0;

    if (u_visualMode == 0) {
        // === Waveform lines ===
        for (int w = 0; w < 8; w++) {
            if (w >= u_waveCount) break;
            float wf = float(w);
            float phase = wf * 0.7 + u_time * u_waveSpeed * (0.5 + wf * 0.2);

            // Compute wave at this x
            float amp = u_waveAmplitude * (0.5 + wf * 0.15);
            // Modulate by audio bands
            amp *= 1.0 + u_bassLevel * 0.5 * step(wf, 2.0)
                       + u_midLevel * 0.5 * step(2.0, wf) * step(wf, 5.0)
                       + u_trebleLevel * 0.5 * step(5.0, wf);

            float waveY = 0.5;
            waveY += sin(p.x * (3.0 + wf) * 3.14159 + phase) * amp;
            waveY += snoise(vec2(p.x * 2.0 + phase * 0.3, wf)) * amp * 0.5;

            float dist = abs(p.y - waveY);
            float lineW = u_lineWidth * 0.003 * audioBoost;
            float line = smoothstep(lineW, 0.0, dist);

            // Glow
            float glow = exp(-dist * 80.0 / u_glowIntensity) * 0.5 * audioBoost;

            // Color per wave
            float hue = fract(wf * 0.12 + u_colorCycle * u_time * 0.05);
            vec3 waveColor = hsv2rgb(vec3(hue, 0.8, 1.0));

            totalColor += waveColor * (line + glow);
        }
    } else if (u_visualMode == 1) {
        // === Circular visualizer ===
        vec2 center = vec2(0.5 * aspect, 0.5);
        vec2 cp = vec2(p.x * aspect, p.y) - center;
        float r = length(cp);
        float a = atan(cp.y, cp.x);

        float baseRadius = 0.15 + u_audioLevel * 0.1;

        // Inner circle ring
        for (int w = 0; w < 4; w++) {
            if (w >= u_waveCount) break;
            float wf = float(w);
            float ringR = baseRadius + wf * 0.06;

            // Perturb the ring with audio
            float perturbation = sin(a * (8.0 + wf * 4.0) + u_time * u_waveSpeed) * 0.02;
            perturbation += snoise(vec2(a * 3.0, u_time * 0.5 + wf)) * 0.03;
            perturbation *= 1.0 + u_bassLevel * 2.0;
            ringR += perturbation * u_waveAmplitude;

            float dist = abs(r - ringR);
            float lineW = u_lineWidth * 0.002 * audioBoost;
            float line = smoothstep(lineW, 0.0, dist);
            float glow = exp(-dist * 100.0 / u_glowIntensity) * 0.4 * audioBoost;

            float hue = fract(wf * 0.2 + a / 6.28318 + u_colorCycle * u_time * 0.05);
            vec3 ringColor = hsv2rgb(vec3(hue, 0.7, 1.0));

            totalColor += ringColor * (line + glow);
        }

        // Center glow
        float centerGlow = exp(-r * 8.0) * u_audioLevel * 2.0;
        totalColor += vec3(0.5, 0.3, 1.0) * centerGlow;
    } else {
        // === Frequency bars ===
        float barCount = 32.0;
        float barWidth = aspect / barCount;
        float barIdx = floor(p.x * aspect / barWidth);
        float barCenter = (barIdx + 0.5) * barWidth / aspect;
        float barDist = abs(p.x - barCenter);

        // Simulate frequency data from audio levels
        float freq = barIdx / barCount;
        float barHeight;
        if (freq < 0.33) {
            barHeight = u_bassLevel * (0.5 + sin(freq * 20.0 + u_time) * 0.3);
        } else if (freq < 0.66) {
            barHeight = u_midLevel * (0.5 + sin(freq * 15.0 + u_time * 1.3) * 0.3);
        } else {
            barHeight = u_trebleLevel * (0.5 + sin(freq * 25.0 + u_time * 0.8) * 0.3);
        }
        barHeight = barHeight * u_waveAmplitude * 2.0 + 0.02;

        float inBar = step(barDist, barWidth * 0.4 / aspect) * step(p.y, barHeight);

        float hue = fract(freq + u_colorCycle * u_time * 0.05);
        vec3 barColor = hsv2rgb(vec3(hue, 0.7, 1.0));

        float glow = exp(-abs(p.y - barHeight) * 30.0) * step(barDist, barWidth * 0.5 / aspect) * u_glowIntensity * 0.3;

        totalColor += barColor * (inBar + glow);
    }

    // Background
    if (u_hasInput == 1) {
        vec4 inputColor = texture(u_inputTexture, uv);
        fragColor = vec4(inputColor.rgb + totalColor, 1.0);
    } else {
        vec3 bg = vec3(0.02, 0.02, 0.04);
        fragColor = vec4(bg + totalColor, 1.0);
    }
}
