import { getSpecificItem } from "@/actions/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductCard from "@/components/card/product-card";

import type { Order } from "@/types/strapi/models/order";
import OrderItemCard from "./_components/order-item-card";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await getSpecificItem<Order>("orders", slug);

  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-lg font-medium mb-2">Buyer Name</h2>
          <p className="mb-5 text-sm">{data.buyerName}</p>
          <h2 className="text-lg font-medium mb-2">Contact</h2>
          <p className="mb-5 text-sm">{data.contact}</p>
          <h2 className="text-lg font-medium mb-2">Note</h2>
          <p className="mb-5 text-sm">{data.note || "No note specified"}</p>
          <h2 className="text-lg font-medium mb-2">Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.items.map((item) => (
              <ProductCard product={item.product} />
            ))}
          </div>
        </CardContent>
      </Card>
      <div>
        <h2 className="text-lg font-medium mb-2">Buyer Name</h2>
        <p className="mb-5 text-sm">{data.buyerName}</p>
        <h2 className="text-lg font-medium mb-2">Contact</h2>
        <p className="mb-5 text-sm">{data.contact}</p>
        <h2 className="text-lg font-medium mb-2">Note</h2>
        <p className="mb-5 text-sm">{data.note || "No note specified"}</p>
        <h2 className="text-lg font-medium mb-2">Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.items.map((item) => (
            <OrderItemCard
              key={item.id}
              product={item.product}
              quantity={item.count}
            />
          ))}
        </div>
      </div>
    </>
  );
}
