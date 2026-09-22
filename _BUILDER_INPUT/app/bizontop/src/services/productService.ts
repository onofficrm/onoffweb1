import { ProductDetail } from '../types/product';
import { PRODUCT_DETAILS } from '../data/productData';

const STORAGE_KEY = 'bizontop_products_v2.0';

class ProductService {
  private products: Record<string, ProductDetail>;

  constructor() {
    this.products = this.loadProducts();
  }

  private loadProducts(): Record<string, ProductDetail> {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with defaults so all required deep properties exist
        const merged: Record<string, ProductDetail> = { ...PRODUCT_DETAILS };
        Object.keys(parsed).forEach((id) => {
          if (merged[id]) {
            merged[id] = { ...merged[id], ...parsed[id] };
          } else {
            merged[id] = parsed[id];
          }
        });
        return merged;
      }
    } catch (e) {
      console.warn('Failed to load products from storage:', e);
    }
    return { ...PRODUCT_DETAILS };
  }

  private saveProducts(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.products));
      window.dispatchEvent(
        new CustomEvent('bizontop_products_updated', { detail: this.products })
      );
    } catch (e) {
      console.warn('Failed to save products to storage:', e);
    }
  }

  public getAllProducts(): ProductDetail[] {
    return Object.values(this.products);
  }

  public getPublishedProducts(): ProductDetail[] {
    return Object.values(this.products).filter((p) => p.isPublished !== false);
  }

  public getProductsByCategory(category: string): ProductDetail[] {
    const cat = category === 'policy-fund' ? 'funding' : category;
    return Object.values(this.products).filter((p) => p.category === cat);
  }

  public getProductById(id: string): ProductDetail | undefined {
    if (this.products[id]) return this.products[id];

    // Check alias
    const aliasMap: Record<string, string> = {
      'facility-capital': 'facility',
      'lab': 'research-center',
      'rnd-dept': 'research-department',
      'corporation': 'incorporation',
      'advisory': 'integrated',
    };
    if (aliasMap[id] && this.products[aliasMap[id]]) {
      return this.products[aliasMap[id]];
    }
    return undefined;
  }

  public updateProduct(
    id: string,
    updates: Partial<ProductDetail>
  ): { success: boolean; product?: ProductDetail; error?: string } {
    const existing = this.getProductById(id);
    if (!existing) {
      return { success: false, error: '존재하지 않는 상품입니다.' };
    }

    const updated: ProductDetail = {
      ...existing,
      ...updates,
      // If connectedServiceId is updated, keep it synced
      connectedServiceId: updates.connectedServiceId || existing.connectedServiceId || existing.id,
    };

    this.products[existing.id] = updated;
    this.saveProducts();

    return { success: true, product: updated };
  }

  public resetToDefault(): void {
    this.products = { ...PRODUCT_DETAILS };
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(
      new CustomEvent('bizontop_products_updated', { detail: this.products })
    );
  }
}

export const productService = new ProductService();
