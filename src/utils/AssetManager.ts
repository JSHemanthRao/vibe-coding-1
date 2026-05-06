/**
 * AssetManager - Preloads and caches assets to ensure smooth transitions.
 */
class AssetManager {
  private static instance: AssetManager;
  private cache: Map<string, any> = new Map();

  public static getInstance(): AssetManager {
    if (!AssetManager.instance) {
      AssetManager.instance = new AssetManager();
    }
    return AssetManager.instance;
  }

  public async preloadImage(url: string): Promise<HTMLImageElement> {
    if (this.cache.has(url)) return this.cache.get(url);

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        this.cache.set(url, img);
        resolve(img);
      };
      img.onerror = reject;
    });
  }

  public async preloadTexture(url: string, loader: any): Promise<any> {
    if (this.cache.has(url)) return this.cache.get(url);

    return new Promise((resolve, reject) => {
      loader.load(url, (texture: any) => {
        // Optimization: Cap texture quality for performance
        texture.generateMipmaps = false;
        texture.minFilter = 1003; // LinearFilter
        texture.magFilter = 1003; // LinearFilter
        
        this.cache.set(url, texture);
        resolve(texture);
      }, undefined, reject);
    });
  }
}

export const assetManager = AssetManager.getInstance();
