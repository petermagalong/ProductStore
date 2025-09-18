import { create } from "zustand";
import axios, {  } from "axios";


const BASE_URL = "http://localhost:5000";
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}
interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  currentProduct: string | null;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  // products state
  products: [],
  loading: false,
  error: null,
  currentProduct: null,

  fetchProducts: async () => {
    set({loading:true});
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      set({products: response.data.data, error:null});
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
      // TypeScript now knows err is an AxiosError
      if (err.status === 429) {
        set({ error: "Rate limit exceeded", products: [] });
      } else {
        set({ error: "Something went wrong", products: [] });
      }
      } else {
        // Handle non-Axios errors
        set({ error: "An unexpected error occurred", products: [] });
      }
    } finally {
      set({ loading: false });
    }
}
}));