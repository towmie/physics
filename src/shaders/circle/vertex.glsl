uniform float uBigElevation;
uniform vec2 uBigFrequency;
uniform float uTime;
uniform float uSpeed;



void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float elevation = sin(modelPosition.x * uBigFrequency.x + uTime * uSpeed) * sin(modelPosition.y * uBigFrequency.y + uTime * uSpeed) * uBigElevation;

  modelPosition.z += elevation;


  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;
}