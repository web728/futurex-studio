import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

export const DistortionMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uHover: 0,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uTime: 0,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    uniform float uHover;
    uniform vec2 uMouse;

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Hover pe subtle wave z-axis displacement
      float dist = distance(uv, uMouse);
      pos.z += sin(dist * 10.0 - uHover * 2.0) * 0.1 * uHover;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform sampler2D uTexture;
    uniform float uHover;
    uniform vec2 uMouse;
    uniform float uTime;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      // Liquid wave calculation based on mouse distance
      float dist = distance(uv, uMouse);
      vec2 distortion = vec2(
        sin(uv.y * 20.0 + uTime * 3.0) * 0.02,
        cos(uv.x * 20.0 + uTime * 3.0) * 0.02
      ) * uHover * (1.0 - smoothstep(0.0, 0.5, dist));

      vec4 color = texture2D(uTexture, uv + distortion);
      gl_FragColor = color;
    }
  `
);

extend({ DistortionMaterial });