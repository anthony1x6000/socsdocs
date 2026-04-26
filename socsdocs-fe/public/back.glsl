void mainImage( out vec4 fragColor, in vec2 fragCoord ){
    // Standard centered UVs for the fractal noise
    vec2 uv = (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);
    
    // Normalized UVs (0.0 to 1.0) strictly used for creating the fade masks
    vec2 st = fragCoord / iResolution.xy; 

    // 1. Force the pattern to flow continually from left to right over time
    uv.x -= iTime * 1.2;

    // 2. Stretch the distortion horizontally to simulate wind/velocity
    for(float i = 1.0; i < 10.0; i++){
        uv.x += 0.8 / i * cos(i * 2.0 * uv.y + iTime);
        uv.y += 0.4 / i * cos(i * 1.5 * uv.x + iTime);
    }

    // Generate the base high-contrast white lines
    float intensity = 0.6 / abs(sin(iTime - uv.y - uv.x));

    // 3. Create a mask that is solid white on the left edge and fades to black on the right
    float horizontalFade = pow(1.0 - st.x, 3.0);

    // 4. Create a vertical mask to bunch the light near the middle (like a beam)
    float verticalFade = smoothstep(1.0, 0.1, abs(st.y - 0.5) * 2.0);

    // Combine the base effect with the directional masks
    vec3 finalColor = vec3(intensity * horizontalFade * verticalFade);

    fragColor = vec4(finalColor, 1.0);
}