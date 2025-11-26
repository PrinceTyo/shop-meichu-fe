"use client";

import * as z from "zod";

import { toast } from "sonner";
import { createProductImage, updateItem } from "@/actions/admin";
import { displayValidationError } from "@/lib/validation-handler";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageField } from "@/components/form/image";
import { Controller } from "react-hook-form";
import UpsertForm from "@/components/form/admin/base/upsert-form";

import type { Category } from "@/types/strapi/models/category";
import type { Product } from "@/types/strapi/models/product";
import { useState } from "react";
import { maxFileSize } from "@/config/form";

export function UpdateCategoryForm({ category }: { category: Category }) {
  return (
    <UpsertForm
      id="update-category"
      type="update"
      model={{ singular: "Category", plural: "Categories" }}
      formSchema={z.object({
        name: z.string().min(1, "The name field is required."),
      })}
      defaultValues={{
        name: category.name,
      }}
      formFields={(formId, form) => {
        return (
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`form-${formId}-input-name`}>
                    Name
                  </FieldLabel>
                  <Input
                    {...field}
                    type="text"
                    required
                    id={`form-${formId}-input-name`}
                    aria-invalid={fieldState.invalid}
                    autoComplete="name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        );
      }}
      onSubmit={async (form, data) => {
        const result = await updateItem<Category>(
          "categories",
          category.documentId,
          data
        );

        switch (result.type) {
          case "success":
            toast.success("Action completed successfully!", {
              style: {
                "--normal-bg":
                  "color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))",
                "--normal-text":
                  "light-dark(var(--color-green-600), var(--color-green-400))",
                "--normal-border":
                  "light-dark(var(--color-green-600), var(--color-green-400))",
              } as React.CSSProperties,
            });
            redirect("/admin/categories");
          case "validation":
            toast.error("Validation error", {
              style: {
                "--normal-bg":
                  "color-mix(in oklab, var(--destructive) 10%, var(--background))",
                "--normal-text": "var(--destructive)",
                "--normal-border": "var(--destructive)",
              } as React.CSSProperties,
            });
            displayValidationError(form, result.validation);
            break;
          case "error":
            toast.error(result.message, {
              style: {
                "--normal-bg":
                  "color-mix(in oklab, var(--destructive) 10%, var(--background))",
                "--normal-text": "var(--destructive)",
                "--normal-border": "var(--destructive)",
              } as React.CSSProperties,
            });
            break;
        }
      }}
    />
  );
}

export function UpdateProductForm({
  categories,
  product,
}: {
  categories: Category[];
  product: Product;
}) {
  const [isImageChanged, setIsImageChanged] = useState(false);
  return (
    <UpsertForm
      id="update-product"
      type="update"
      model={{ singular: "Product", plural: "Products" }}
      formSchema={z.object({
        name: z.string().min(1, "The name field is required."),
        description: z.string().min(1, "The description field is required."),
        price: z.coerce.number().min(1, "The price field is required."),
        stock: z.coerce.number().min(1, "The stock field is required."),
        category: z.coerce.number("The category field is required."),
        image: z
          .instanceof(File, { message: "Please select an image file." })
          .refine((file) => file.size > 0, {
            message: "Image file is required.",
          })
          .refine((file) => file.size <= maxFileSize, {
            message: "Image file size must be less than 5MB.",
          })
          .refine(
            (file) => {
              const validTypes = [
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/webp",
              ];
              return validTypes.includes(file.type);
            },
            {
              message: "Only JPEG, PNG, WebP images are allowed.",
            }
          ),
      })}
      defaultValues={{
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category?.id
          ? String(product.category?.id)
          : undefined,
        image: undefined,
      }}
      formFields={(formId, form) => {
        return (
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`form-${formId}-input-name`}>
                    Name
                  </FieldLabel>
                  <Input
                    {...field}
                    type="text"
                    required
                    id={`form-${formId}-input-name`}
                    aria-invalid={fieldState.invalid}
                    autoComplete="name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`form-${formId}-input-description`}>
                    Description
                  </FieldLabel>
                  <Input
                    {...field}
                    type="text"
                    required
                    id={`form-${formId}-input-description`}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`form-${formId}-input-price`}>
                    Price
                  </FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    required
                    id={`form-${formId}-input-price`}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="stock"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`form-${formId}-input-stock`}>
                    Stock
                  </FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    required
                    id={`form-${formId}-input-stock`}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`form-${formId}-input-category`}>
                    Category
                  </FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id={`form-${formId}-input-category`}
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={String(category.id)}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`form-${formId}-input-image`}>
                    Image
                  </FieldLabel>
                  <ImageField
                    defaultValue={
                      product.image?.url
                        ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${product.image.url}`
                        : undefined
                    }
                    field={field}
                    setIsImageChanged={setIsImageChanged}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        );
      }}
      onSubmit={async (form, data) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { image: _, ...selectedData } = data;
        const result = await updateItem<Product>(
          "products",
          product.documentId,
          selectedData as any
        );
        if (result.type === "success" && isImageChanged) {
          await createProductImage({
            productId: result.data.data.id,
            file: data.image as unknown as File,
          });
        }

        switch (result.type) {
          case "success":
            toast.success("Action completed successfully!", {
              style: {
                "--normal-bg":
                  "color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))",
                "--normal-text":
                  "light-dark(var(--color-green-600), var(--color-green-400))",
                "--normal-border":
                  "light-dark(var(--color-green-600), var(--color-green-400))",
              } as React.CSSProperties,
            });
            redirect("/admin/products");
            break;
          case "validation":
            toast.error("Validation error", {
              style: {
                "--normal-bg":
                  "color-mix(in oklab, var(--destructive) 10%, var(--background))",
                "--normal-text": "var(--destructive)",
                "--normal-border": "var(--destructive)",
              } as React.CSSProperties,
            });
            displayValidationError(form, result.validation);
            break;
          case "error":
            toast.error(result.message, {
              style: {
                "--normal-bg":
                  "color-mix(in oklab, var(--destructive) 10%, var(--background))",
                "--normal-text": "var(--destructive)",
                "--normal-border": "var(--destructive)",
              } as React.CSSProperties,
            });
            break;
        }
      }}
    />
  );
}
