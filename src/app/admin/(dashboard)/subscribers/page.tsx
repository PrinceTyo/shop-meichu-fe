import { subscribersColumn } from "@/config/table-column";
import { deleteSubscriber, getAllSubscribers } from "@/lib/api/subscribers";
import { TableActionProvider } from "@/context/table-action-provider";
import { AdminHeader } from "@/components/layout/header/admin-header";
import { AdminTable } from "@/components/table/admin-table";

export default async function Page() {
  return (
    <>
      <AdminHeader title="Subscribers" />
      <TableActionProvider
        getAction={getAllSubscribers}
        deleteAction={deleteSubscriber}
        filters={{ email: "$contains" }}
      >
        <AdminTable columns={subscribersColumn} />
      </TableActionProvider>
    </>
  );
}
