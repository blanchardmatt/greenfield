#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform sampler2D u_inputTexture;
uniform sampler2D u_charAtlas;
uniform int u_hasInput;
uniform float u_cellSize;
uniform int u_charCount;
uniform float u_brightness;
uniform float u_contrast;
uniform vec4 u_fgColor;
uniform vec4 u_bgColor;
uniform float u_colorize;
uniform float u_invert;

out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;

    if (u_hasInput == 0) {
        fragColor = u_bgColor;
        return;
    }

    // Snap to cell grid
    float cell = max(4.0, u_cellSize);
    vec2 cellCoord = floor(gl_FragCoord.xy / cell) * cell + cell * 0.5;
    vec2 cellUv = cellCoord / u_resolution;

    // Sample average color from the cell
    vec4 sampleColor = texture(u_inputTexture, cellUv);
    float lum = dot(sampleColor.rgb, vec3(0.299, 0.587, 0.114));
    lum = clamp((lum - 0.5) * u_contrast + 0.5, 0.0, 1.0);
    lum = clamp(lum * u_brightness, 0.0, 1.0);

    if (u_invert > 0.5) lum = 1.0 - lum;

    // Pick a character index based on luminance
    int charIdx = int(floor(lum * float(u_charCount - 1) + 0.5));
    charIdx = clamp(charIdx, 0, u_charCount - 1);

    // Per-cell coordinates (0..1 within the cell)
    vec2 inCell = (gl_FragCoord.xy - (cellCoord - cell * 0.5)) / cell;

    // Atlas is laid out as a horizontal strip of u_charCount cells
    float atlasU = (float(charIdx) + inCell.x) / float(u_charCount);
    float atlasV = inCell.y;
    float charSample = texture(u_charAtlas, vec2(atlasU, atlasV)).r;

    // Output color
    vec3 fg = mix(u_fgColor.rgb, sampleColor.rgb, u_colorize);
    vec3 col = mix(u_bgColor.rgb, fg, charSample);
    fragColor = vec4(col, 1.0);
}
