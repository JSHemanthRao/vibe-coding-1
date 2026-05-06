import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { sceneManager } from './three/SceneManager';

const vertexShader = `
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;
uniform float uTime, uAttenuation, uLineThickness, uBaseRadius, uRadiusStep, uScaleRate;
uniform float uOpacity, uNoiseAmount, uRotation, uRingGap, uFadeIn, uFadeOut;
uniform float uMouseInfluence, uHoverAmount, uHoverScale, uParallax, uBurst;
uniform vec2 uResolution, uMouse;
uniform vec3 uColor, uColorTwo;
uniform int uRingCount;

const float HP = 1.5707963;
const float CYCLE = 3.45;

float fade(float t) {
  return t < uFadeIn ? smoothstep(0.0, uFadeIn, t) : 1.0 - smoothstep(uFadeOut, CYCLE - 0.2, t);
}

float ring(vec2 p, float ri, float cut, float t0, float px) {
  float t = mod(uTime + t0, CYCLE);
  float r = ri + t / CYCLE * uScaleRate;
  float d = abs(length(p) - r);
  float a = atan(abs(p.y), abs(p.x)) / HP;
  float th = max(1.0 - a, 0.5) * px * uLineThickness;
  float h = (1.0 - smoothstep(th, th * 1.5, d)) + 1.0;
  d += pow(cut * a, 3.0) * r;
  return h * exp(-uAttenuation * d) * fade(t);
}

void main() {
  float px = 1.0 / min(uResolution.x, uResolution.y);
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution.xy) * px;
  float cr = cos(uRotation), sr = sin(uRotation);
  p = mat2(cr, -sr, sr, cr) * p;
  p -= uMouse * uMouseInfluence;
  float sc = mix(1.0, uHoverScale, uHoverAmount) + uBurst * 0.3;
  p /= sc;
  vec3 c = vec3(0.0);
  float rcf = max(float(uRingCount) - 1.0, 1.0);
  for (int i = 0; i < 10; i++) {
    if (i >= uRingCount) break;
    float fi = float(i);
    vec2 pr = p - fi * uParallax * uMouse;
    vec3 rc = mix(uColor, uColorTwo, fi / rcf);
    c = mix(c, rc, vec3(ring(pr, uBaseRadius + fi * uRadiusStep, pow(uRingGap, fi), i == 0 ? 0.0 : 2.95 * fi, px)));
  }
  c *= 1.0 + uBurst * 2.0;
  float n = fract(sin(dot(gl_FragCoord.xy + uTime * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
  c += (n - 0.5) * uNoiseAmount;
  gl_FragColor = vec4(c, max(c.r, max(c.g, c.b)) * uOpacity);
}
`;

interface MagicRingsProps {
  id?: string;
  color?: string; colorTwo?: string; speed?: number; ringCount?: number;
  attenuation?: number; lineThickness?: number; baseRadius?: number;
  radiusStep?: number; scaleRate?: number; opacity?: number;
  noiseAmount?: number; rotation?: number; ringGap?: number;
  fadeIn?: number; fadeOut?: number; followMouse?: boolean;
  mouseInfluence?: number; hoverScale?: number; parallax?: number;
  clickBurst?: boolean;
}

/**
 * MagicRings (Headless Controller)
 * Registers a shader mesh with the global SceneManager.
 */
export default function MagicRings({
  id = 'magic-rings',
  color = '#ffffff', colorTwo = '#8a8a8a', speed = 1, ringCount = 3,
  attenuation = 10, lineThickness = 2, baseRadius = 0.35,
  radiusStep = 0.1, scaleRate = 0.1, opacity = 1, noiseAmount = 0.1,
  rotation = 0, ringGap = 1.5, fadeIn = 0.7, fadeOut = 0.5,
  followMouse = false, mouseInfluence = 0.2, hoverScale = 1.2,
  parallax = 0.05, clickBurst = false,
}: MagicRingsProps) {
  const propsRef = useRef<MagicRingsProps>({
    color, colorTwo, speed, ringCount, attenuation, lineThickness,
    baseRadius, radiusStep, scaleRate, opacity, noiseAmount,
    rotation, ringGap, fadeIn, fadeOut, followMouse, mouseInfluence,
    hoverScale, parallax, clickBurst,
  });

  const mouseRef = useRef([0, 0]);
  const smoothMouseRef = useRef([0, 0]);
  const hoverAmountRef = useRef(0);
  const isHoveredRef = useRef(false);
  const burstRef = useRef(0);

  useEffect(() => {
    propsRef.current = {
      color, colorTwo, speed, ringCount, attenuation, lineThickness,
      baseRadius, radiusStep, scaleRate, opacity, noiseAmount,
      rotation, ringGap, fadeIn, fadeOut, followMouse, mouseInfluence,
      hoverScale, parallax, clickBurst,
    };
  }, [color, colorTwo, speed, ringCount, attenuation, lineThickness, baseRadius, radiusStep, scaleRate, opacity, noiseAmount, rotation, ringGap, fadeIn, fadeOut, followMouse, mouseInfluence, hoverScale, parallax, clickBurst]);

  useEffect(() => {
    const scene = sceneManager.getScene();
    
    const uniforms = {
      uTime: { value: 0 },
      uAttenuation: { value: 10 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uColor: { value: new THREE.Color(color) },
      uColorTwo: { value: new THREE.Color(colorTwo) },
      uLineThickness: { value: lineThickness },
      uBaseRadius: { value: baseRadius },
      uRadiusStep: { value: radiusStep },
      uScaleRate: { value: scaleRate },
      uRingCount: { value: ringCount },
      uOpacity: { value: opacity },
      uNoiseAmount: { value: noiseAmount },
      uRotation: { value: (rotation * Math.PI) / 180 },
      uRingGap: { value: ringGap },
      uFadeIn: { value: fadeIn },
      uFadeOut: { value: fadeOut },
      uMouse: { value: new THREE.Vector2() },
      uMouseInfluence: { value: followMouse ? mouseInfluence : 0 },
      uHoverAmount: { value: 0 },
      uHoverScale: { value: hoverScale },
      uParallax: { value: parallax },
      uBurst: { value: 0 },
    };

    const geometry = sceneManager.getGeometry('fullscreen-plane', () => new THREE.PlaneGeometry(2, 2));
    const material = sceneManager.getMaterial('magic-rings-mat', () => new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, transparent: true })) as THREE.ShaderMaterial;
    
    const quad = new THREE.Mesh(geometry, material);
    scene.add(quad);

    const onUpdate = (time: number) => {
      const p = propsRef.current;
      smoothMouseRef.current[0] += (mouseRef.current[0] - smoothMouseRef.current[0]) * 0.1;
      smoothMouseRef.current[1] += (mouseRef.current[1] - smoothMouseRef.current[1]) * 0.1;
      hoverAmountRef.current += ((isHoveredRef.current ? 1 : 0) - hoverAmountRef.current) * 0.1;
      burstRef.current *= 0.94;
      if (burstRef.current < 0.001) burstRef.current = 0;

      uniforms.uTime.value = time * 0.001 * (p.speed || 1);
      uniforms.uAttenuation.value = p.attenuation || 10;
      uniforms.uColor.value.set(p.color || '#fff');
      uniforms.uColorTwo.value.set(p.colorTwo || '#888');
      uniforms.uMouse.value.set(smoothMouseRef.current[0], smoothMouseRef.current[1]);
      uniforms.uHoverAmount.value = hoverAmountRef.current;
      uniforms.uBurst.value = p.clickBurst ? burstRef.current : 0;
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };

    sceneManager.addEntity(id, onUpdate);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current[0] = (e.clientX / window.innerWidth) - 0.5;
      mouseRef.current[1] = -((e.clientY / window.innerHeight) - 0.5);
    };
    const onClick = () => { burstRef.current = 1; };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

    return () => {
      sceneManager.removeEntity(id);
      scene.remove(quad);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
    };
  }, [id]);

  return null; // Headless
}
