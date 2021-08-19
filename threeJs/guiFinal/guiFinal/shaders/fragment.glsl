uniform sampler2D globeTexture;
uniform vec3 atmosphereColor;

varying vec2 vertexUV;
varying vec3 vertexNormal;

void main()
{
    float intensity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));

    //vec3 earthAtmoColor = vec3(0.3, 0.6, 1.0);
    //vec3 hotAtmoColor = vec3(1.0, 0.0, 0.0);
    //vec3 coldAtmoColor = vec3(0.8, 0.8, 1.0);

    vec3 atmosphere = atmosphereColor * pow(intensity, 1.5);

    //BASIC TEXTURE
    //gl_FragColor = texture2D(globeTexture, vertexUV);

    //TINT
    //gl_FragColor = vec4(vec3(0.5, 0, 0) + texture2D(globeTexture, vertexUV).xyz, 1.0);

    //ATMOSPHERE
    gl_FragColor = vec4(atmosphere + texture2D(globeTexture, vertexUV).xyz, 1.0);
}