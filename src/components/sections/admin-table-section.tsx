"use client";

import Link from "next/link";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "../ui/skeleton";
import { Plus } from "lucide-react";
import { useDataTable } from "@/hooks/use-data-table";
import { useEffect, useMemo, useState } from "react";
import { parseAsInteger, parseAsJson, useQueryStates } from "nuqs";
import { getAllItem } from "@/actions/admin";
import { deleteItem as deleteItemAdmin } from "@/actions/admin";

import type { StrapiPagination } from "@/types/strapi/pagination";
import type { ColumnDef } from "@tanstack/react-table";
import type { ColumnWithDelete, ColumnWithoutDelete } from "@/types/data-table";

function getSortKey(sorts: { id: string; desc: boolean }[]): string {
  return sorts
    .map((s, i) => `sort[${i}][id]=${s.id}-sort[${i}][desc]=${s.desc}`)
    .join("-");
}

interface DataTableFetcherWithDelete<T> {
  columns: ColumnWithDelete<T>;
  model: string;
  populate?: object;
  enableDelete: true;
}

interface DataTableFetcherWithoutDelete<T> {
  columns: ColumnWithoutDelete<T>;
  model: string;
  populate?: object;
  enableDelete: false;
}

type DataTableFetchProps<T> =
  | DataTableFetcherWithDelete<T>
  | DataTableFetcherWithoutDelete<T>;

function useTableFetcher<T>({
  model,
  populate,
}: Pick<DataTableFetchProps<T>, "model" | "populate">) {
  const [counter, setCounter] = useState(0);
  const [{ sort, page, perPage }] = useQueryStates({
    sort: parseAsJson<Array<{ id: string; desc: boolean }>>((value) => {
      if (
        Array.isArray(value) &&
        value.every(
          (item) =>
            typeof item === "object" &&
            item !== null &&
            typeof item.id === "string" &&
            typeof item.desc === "boolean"
        )
      ) {
        return value as Array<{ id: string; desc: boolean }>;
      }
      return null;
    }).withDefault([]),
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(20),
  });

  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState<StrapiPagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const deleteItem = () => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const strapiSort = sort.map(
          (s) => `${s.id}:${s.desc ? "desc" : "asc"}`
        );

        const result = await getAllItem<T>(
          model,
          populate,
          {
            page,
            pageSize: perPage,
            withCount: true,
          },
          strapiSort.length > 0 ? strapiSort : undefined
        );

        setData(result.data);
        setPagination(result.meta?.pagination || null);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [sort, page, perPage, model, populate, counter]);

  return {
    data,
    pagination,
    isLoading,
    deleteItem,
    counter,
    sort,
    page,
    perPage,
  };
}

export function DataTableFetcher<T>({
  columns,
  model,
  populate,
  enableDelete,
}: DataTableFetchProps<T>) {
  const {
    data,
    pagination,
    isLoading,
    deleteItem,
    counter,
    sort,
    page,
    perPage,
  } = useTableFetcher<T>({
    model,
    populate,
  });

  const resolvedColumns = enableDelete
    ? columns(async (identifier: string, documentId: string) => {
        const result = await deleteItemAdmin(identifier, documentId);
        if (result.type === "success") deleteItem();
      })
    : columns();

  const key = useMemo(
    () => `table-${counter}-${getSortKey(sort)}-${page}-${perPage}`,
    [counter, sort, page, perPage]
  );
  return data.length !== 0 || !isLoading ? (
    <AdminTableSection
      key={key}
      data={data}
      columns={resolvedColumns}
      pagination={pagination!}
      model={model}
    />
  ) : (
    <Skeleton className="w-full h-screen" />
  );
}

export default function AdminTableSection<T>({
  data,
  columns,
  pagination,
  model,
}: {
  data: T[];
  columns: ColumnDef<T>[];
  pagination: StrapiPagination;
  model: string;
}) {
  const { table } = useDataTable({
    data,
    columns,
    pageCount: pagination.pageCount,
    initialState: {
      pagination: { pageIndex: pagination.page, pageSize: pagination.pageSize },
    },
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <Button asChild>
          <Link href={`${model}/create`}>
            <Plus />
            Create
          </Link>
        </Button>
      </DataTableToolbar>
    </DataTable>
  );
}
