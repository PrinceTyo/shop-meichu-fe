import { Product } from "../../models/product";

export interface TrendingProductSection {
  id: number;
  products?: Product[];
}
