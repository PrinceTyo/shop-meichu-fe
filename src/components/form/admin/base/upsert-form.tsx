"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DefaultValues,
  type FieldValues,
  Resolver,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";
import * as z from "zod";

import type { $ZodTypes } from "zod/v4/core";

interface ModelProps {
  singular: string;
  plural: string;
}

interface UpsertFormProps<
  TData extends FieldValues = FieldValues,
  TForm extends z.ZodObject<ZodFormSchema<TData>, z.core.$strip> = z.ZodObject<
    ZodFormSchema<TData>,
    z.core.$strip
  >,
> {
  id: string;
  type: "create" | "update";
  model: ModelProps;
  formSchema: TForm;
  defaultValues: TData;
  title?: string;
  formFields?: (
    formId: string,
    form: UseFormReturn<TData, any, TData>
  ) => React.ReactNode;
  onSubmit: (
    form: UseFormReturn<TData, any, TData>,
    data: TData
  ) => Promise<void>;
}

type ZodFormSchema<T> = {
  [K in keyof T]: $ZodTypes;
};

export default function UpsertForm<
  TData extends FieldValues = FieldValues,
  TForm extends z.ZodObject<ZodFormSchema<TData>, z.core.$strip> = z.ZodObject<
    ZodFormSchema<TData>,
    z.core.$strip
  >,
>(props: UpsertFormProps<TData, TForm>) {
  const formElemRef = useRef<HTMLFormElement>(null);
  const form = useForm<TData>({
    resolver: zodResolver(props.formSchema) as unknown as Resolver<
      TData,
      any,
      TData
    >,
    defaultValues: props.defaultValues as DefaultValues<TData>,
  });

  return (
    <>
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/admin/${props.model.plural.toLowerCase()}`}>
                {props.model.plural}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight />
          </BreadcrumbSeparator>
          {props.type === "update" && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink>{props.title}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight />
              </BreadcrumbSeparator>
            </>
          )}
          <BreadcrumbItem>
            <BreadcrumbPage>
              {props.type === "create" ? "Create" : "Edit"}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card>
        <CardContent>
          <form
            ref={formElemRef}
            id={`form-${props.id}`}
            onSubmit={form.handleSubmit(
              (data) => props.onSubmit(form, data),
              (error) => {
                console.log(error);
              }
            )}
          >
            {props.formFields?.(props.id, form)}
          </form>
        </CardContent>

        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" form={`form-${props.id}`}>
              {props.type === "create" ? "Create" : "Update"}
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </>
  );
}
