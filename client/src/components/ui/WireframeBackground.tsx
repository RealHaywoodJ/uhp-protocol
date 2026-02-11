import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

const PLANE_WIDTH = 16;
const PLANE_HEIGHT = 12;
const PLANE_WIDTH_SEGMENTS = 40;
const PLANE_HEIGHT_SEGMENTS = 30;

const AMPLITUDE = 0.4;
const FREQUENCY = 0.5;
const TIME_MULTIPLIER = 0.0003;

const SECONDARY_AMPLITUDE = 0.15;
const SECONDARY_FREQUENCY = 0.8;

const PARTICLE_COUNT = 60;
const PARTICLE_MIN_SIZE = 0.03;
const PARTICLE_MAX_SIZE = 0.05;

const GLOW_COUNT = 3;
const FRAME_INTERVAL_MS = 33;

const THEME_CONFIG = {
  light: {
    wireColor: 0x4f46e5,
    wireOpacity: 0.04,
    particleColor: 0x7c3aed,
    particleOpacity: 0.08,
  },
  dark: {
    wireColor: 0xa78bfa,
    wireOpacity: 0.07,
    particleColor: 0xc4b5fd,
    particleOpacity: 0.12,
  },
} as const;

const GLOW_CONFIGS = [
  { color: 0x7c3aed, opacity: 0.015, scale: 4, position: new THREE.Vector3(-2, 1.5, -1) },
  { color: 0x06b6d4, opacity: 0.01, scale: 5, position: new THREE.Vector3(3, 2, -2) },
  { color: 0x8b5cf6, opacity: 0.02, scale: 3, position: new THREE.Vector3(0, 1, 1) },
] as const;

interface ThemeColors {
  wireColor: number;
  wireOpacity: number;
  particleColor: number;
  particleOpacity: number;
}

interface ParticleData {
  baseX: number;
  baseY: number;
  baseZ: number;
  offsetX: number;
  offsetY: number;
  offsetZ: number;
  speed: number;
}

function createPlane(themeColors: ThemeColors): {
  mesh: THREE.Mesh;
  geometry: THREE.PlaneGeometry;
  material: THREE.MeshBasicMaterial;
} {
  const geometry = new THREE.PlaneGeometry(
    PLANE_WIDTH,
    PLANE_HEIGHT,
    PLANE_WIDTH_SEGMENTS,
    PLANE_HEIGHT_SEGMENTS,
  );

  const material = new THREE.MeshBasicMaterial({
    wireframe: true,
    transparent: true,
    color: themeColors.wireColor,
    opacity: themeColors.wireOpacity,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 3;
  mesh.position.y = -1.5;

  return { mesh, geometry, material };
}

function createParticles(themeColors: ThemeColors): {
  points: THREE.Points;
  geometry: THREE.BufferGeometry;
  material: THREE.PointsMaterial;
  data: ParticleData[];
} {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const data: ParticleData[] = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const baseX = (Math.random() - 0.5) * PLANE_WIDTH * 0.8;
    const baseY = Math.random() * 3 + 0.5;
    const baseZ = (Math.random() - 0.5) * PLANE_HEIGHT * 0.5;

    positions[i * 3] = baseX;
    positions[i * 3 + 1] = baseY;
    positions[i * 3 + 2] = baseZ;

    data.push({
      baseX,
      baseY,
      baseZ,
      offsetX: Math.random() * Math.PI * 2,
      offsetY: Math.random() * Math.PI * 2,
      offsetZ: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.4,
    });
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const size = PARTICLE_MIN_SIZE + Math.random() * (PARTICLE_MAX_SIZE - PARTICLE_MIN_SIZE);
  const material = new THREE.PointsMaterial({
    size,
    transparent: true,
    color: themeColors.particleColor,
    opacity: themeColors.particleOpacity,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geometry, material);

  return { points, geometry, material, data };
}

function createGlowSpheres(): {
  meshes: THREE.Mesh[];
  geometries: THREE.SphereGeometry[];
  materials: THREE.MeshBasicMaterial[];
} {
  const meshes: THREE.Mesh[] = [];
  const geometries: THREE.SphereGeometry[] = [];
  const materials: THREE.MeshBasicMaterial[] = [];

  for (let i = 0; i < GLOW_COUNT; i++) {
    const config = GLOW_CONFIGS[i];
    const geometry = new THREE.SphereGeometry(1, 16, 16);
    const material = new THREE.MeshBasicMaterial({
      color: config.color,
      transparent: true,
      opacity: config.opacity,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.setScalar(config.scale);
    mesh.position.copy(config.position);

    meshes.push(mesh);
    geometries.push(geometry);
    materials.push(material);
  }

  return { meshes, geometries, materials };
}

function animatePlane(geometry: THREE.PlaneGeometry, time: number): void {
  const positions = geometry.attributes.position;
  const vertexCount = positions.count;

  for (let i = 0; i < vertexCount; i++) {
    const x = positions.getX(i);
    const z = positions.getZ(i);

    const primaryWave = AMPLITUDE * Math.sin(x * FREQUENCY + time) * Math.cos(z * FREQUENCY + time);
    const secondaryWave =
      SECONDARY_AMPLITUDE * Math.sin(x * SECONDARY_FREQUENCY - time * 1.3) *
      Math.cos(z * SECONDARY_FREQUENCY + time * 0.7);

    positions.setY(i, primaryWave + secondaryWave);
  }

  geometry.attributes.position.needsUpdate = true;
}

function animateParticles(
  geometry: THREE.BufferGeometry,
  data: ParticleData[],
  time: number,
): void {
  const positions = geometry.attributes.position as THREE.BufferAttribute;

  for (let i = 0; i < data.length; i++) {
    const p = data[i];
    const t = time * p.speed;

    positions.setX(i, p.baseX + Math.sin(t + p.offsetX) * 0.3);
    positions.setY(i, p.baseY + Math.sin(t * 0.7 + p.offsetY) * 0.2);
    positions.setZ(i, p.baseZ + Math.cos(t * 0.5 + p.offsetZ) * 0.3);
  }

  positions.needsUpdate = true;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function WireframeBackground(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const themeColors = THEME_CONFIG[theme];

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Scene and camera
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.set(0, 3, 8);
    camera.lookAt(0, 0, 0);

    // Wireframe plane
    const plane = createPlane(themeColors);
    scene.add(plane.mesh);

    // Floating particles
    const particles = createParticles(themeColors);
    scene.add(particles.points);

    // Glow spheres
    const glow = createGlowSpheres();
    for (const mesh of glow.meshes) {
      scene.add(mesh);
    }

    // Reduced motion: render a single static frame
    if (prefersReducedMotion()) {
      const staticTime = TIME_MULTIPLIER * Date.now();
      animatePlane(plane.geometry, staticTime);
      animateParticles(particles.geometry, particles.data, staticTime);
      renderer.render(scene, camera);

      return function cleanup() {
        renderer.dispose();
        plane.geometry.dispose();
        plane.material.dispose();
        particles.geometry.dispose();
        particles.material.dispose();
        for (let i = 0; i < glow.geometries.length; i++) {
          glow.geometries[i].dispose();
          glow.materials[i].dispose();
        }
      };
    }

    // Animation loop with frame limiting
    let animationFrameId: number;
    let lastFrameTime = 0;

    function animate(now: number): void {
      animationFrameId = requestAnimationFrame(animate);

      const deltaTime = now - lastFrameTime;
      if (deltaTime < FRAME_INTERVAL_MS) return;
      lastFrameTime = now;

      const time = TIME_MULTIPLIER * Date.now();

      animatePlane(plane.geometry, time);
      animateParticles(particles.geometry, particles.data, time);

      renderer.render(scene, camera);
    }

    animationFrameId = requestAnimationFrame(animate);

    // Resize handler
    function handleResize(): void {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return function cleanup() {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      plane.geometry.dispose();
      plane.material.dispose();
      particles.geometry.dispose();
      particles.material.dispose();
      for (let i = 0; i < glow.geometries.length; i++) {
        glow.geometries[i].dispose();
        glow.materials[i].dispose();
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        willChange: 'transform',
      }}
    />
  );
}
