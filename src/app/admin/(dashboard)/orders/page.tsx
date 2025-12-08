import { orderColumn } from "@/config/table-column";
import { getAllOrders } from "@/lib/api/orders";
import { TableActionProvider } from "@/context/table-action-provider";
import { AdminTable } from "@/components/table/admin-table";

export default async function Page() {
  return (
    <TableActionProvider getAction={getAllOrders}>
      <AdminTable columns={orderColumn} />
    </TableActionProvider>
  );
}
