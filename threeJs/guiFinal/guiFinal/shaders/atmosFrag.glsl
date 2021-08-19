varying vec3 vertexNormal;
uniform vec4 atmosphereColor;

void main() {
    float intensity = pow(0.55 - dot(vertexNormal, vec3(0, 0, 1.0)), 2.0);
    gl_FragColor = atmosphereColor * intensity;
}