import { Product } from "@/types/strapi/models/product";
import StrapiImage from "@/components/global/strapi-image";

export default function OrderItemCard({
  product,
  quantity,
}: {
  product: Product;
  quantity: number;
}) {
  return (
    <div>
      <StrapiImage src={product.images?.[0]} alt={product.name} size="small" />
      <div>
        <h3>{product.name}</h3>
        <p>{product.price}</p>
        <p>{quantity}</p>
      </div>
    </div>
  );
}
