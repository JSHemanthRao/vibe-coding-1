import * as THREE from 'three';

/**
 * SceneManager - A high-performance singleton for orchestrating Three.js logic.
 * Decouples the rendering engine from React's reconciliation cycle.
 */
class SceneManager {
  private static instance: SceneManager;
  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private clock: THREE.Clock;
  private frameId: number | null = null;
  private isPaused: boolean = false;
  private entities: Map<string, { updateFn: (time: number, delta: number) => void, active: boolean }> = new Map();
  private geometries: Map<string, THREE.BufferGeometry> = new Map();
  private materials: Map<string, THREE.Material> = new Map();

  private constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.clock = new THREE.Clock();
  }

  public static getInstance(): SceneManager {
    if (!SceneManager.instance) {
      SceneManager.instance = new SceneManager();
    }
    return SceneManager.instance;
  }

  public init(canvas: HTMLCanvasElement) {
    if (this.renderer) return;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: window.devicePixelRatio < 2,
      powerPreference: "high-performance",
    });

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.autoClear = true;

    this.startLoop();
  }

  private startLoop() {
    let lastTime = performance.now();
    let frameCount = 0;
    let lowFpsCount = 0;

    const animate = (time: number) => {
      this.frameId = requestAnimationFrame(animate);
      if (this.isPaused || !this.renderer) return;

      const delta = this.clock.getDelta();
      
      // Performance Monitoring & Adaptive Resolution
      frameCount++;
      const currentTime = performance.now();
      if (currentTime - lastTime > 1000) {
        const fps = (frameCount * 1000) / (currentTime - lastTime);
        if (fps < 50) {
          lowFpsCount++;
          if (lowFpsCount > 3) {
            // Drop resolution to save GPU
            const currentDPR = this.renderer.getPixelRatio();
            this.renderer.setPixelRatio(Math.max(1, currentDPR - 0.25));
            lowFpsCount = 0;
          }
        } else {
          lowFpsCount = 0;
          // Gradually recover resolution if performance is great
          const currentDPR = this.renderer.getPixelRatio();
          if (currentDPR < Math.min(window.devicePixelRatio, 2)) {
            this.renderer.setPixelRatio(currentDPR + 0.1);
          }
        }
        lastTime = currentTime;
        frameCount = 0;
      }

      // Update active entities
      this.entities.forEach(entity => {
        if (entity.active) entity.updateFn(time, delta);
      });

      // Render
      this.renderer.render(this.scene, this.camera);
    };
    this.frameId = requestAnimationFrame(animate);
  }

  public pause() { this.isPaused = true; }
  public resume() { this.isPaused = false; }

  public addEntity(id: string, updateFn: (time: number, delta: number) => void) {
    this.entities.set(id, { updateFn, active: true });
  }

  public removeEntity(id: string) {
    this.entities.delete(id);
  }

  public setEntityActive(id: string, active: boolean) {
    const entity = this.entities.get(id);
    if (entity) entity.active = active;
  }

  public getGeometry(id: string, creator: () => THREE.BufferGeometry): THREE.BufferGeometry {
    if (!this.geometries.has(id)) {
      this.geometries.set(id, creator());
    }
    return this.geometries.get(id)!;
  }

  public getMaterial(id: string, creator: () => THREE.Material): THREE.Material {
    if (!this.materials.has(id)) {
      this.materials.set(id, creator());
    }
    return this.materials.get(id)!;
  }

  public onResize(width: number, height: number) {
    if (!this.renderer) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  public dispose() {
    if (this.frameId) cancelAnimationFrame(this.frameId);
    this.renderer?.dispose();
    this.renderer = null;
    this.entities.clear();
    this.geometries.forEach(g => g.dispose());
    this.materials.forEach(m => m.dispose());
    this.geometries.clear();
    this.materials.clear();
  }

  public getScene() { return this.scene; }
  public getCamera() { return this.camera; }
}

export const sceneManager = SceneManager.getInstance();
