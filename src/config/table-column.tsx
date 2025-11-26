"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { ColumnWithDelete } from "@/types/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import Image from "@/components/global/image";

import type { ColumnDef } from "@tanstack/react-table";
import type { Product } from "@/types/strapi/models/product";
import type { Category } from "@/types/strapi/models/category";
import type { StrapiImage } from "@/types/strapi/image";

export const categoriesColumn: ColumnWithDelete<Category> = (
  deleteAction: (identifier: string, documentId: string) => Promise<void>
): ColumnDef<Category>[] => {
  return [
    {
      id: "id",
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="ID" />
      ),
      enableColumnFilter: true,
      size: 12,
    },
    {
      id: "name",
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Name" />
      ),
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
      enableColumnFilter: true,
    },
    {
      id: "slug",
      accessorKey: "slug",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Slug" />
      ),
      enableColumnFilter: true,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/admin/categories/edit/${row.original.slug}`}>
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() =>
                  deleteAction("categories", row.original.documentId)
                }
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      size: 32,
    },
  ];
};

export const productsColumn: ColumnWithDelete<Product> = (
  deleteAction: (identifier: string, documentId: string) => Promise<void>
): ColumnDef<Product>[] => {
  return [
    {
      id: "id",
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="ID" />
      ),
      enableColumnFilter: true,
    },
    {
      id: "name",
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Name" />
      ),
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
      enableColumnFilter: true,
    },
    {
      id: "price",
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Price" />
      ),
      cell: ({ row }) => <div>{formatCurrency(row.getValue("price"))}</div>,
      enableColumnFilter: true,
    },
    {
      id: "stock",
      accessorKey: "stock",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Stock" />
      ),
      cell: ({ row }) => (
        <div>{(row.getValue("stock") as number).toLocaleString()}</div>
      ),
      enableColumnFilter: true,
    },
    {
      id: "image",
      accessorKey: "image",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Image" />
      ),
      cell: ({ row }) => {
        const image = row.getValue("image") as StrapiImage;

        return image ? (
          <Image
            className="size-12 object-contain rounded-4"
            src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${image.formats?.thumbnail?.url ?? image.url}`}
          />
        ) : null;
      },
      enableSorting: false,
      enableColumnFilter: false,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/admin/products/edit/${row.original.slug}`}>
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => deleteAction("products", row.original.documentId)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      size: 32,
    },
  ];
};
