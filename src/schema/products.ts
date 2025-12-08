import * as z from "zod";
import { imageValidation } from "./template";

export const upsertProductSchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z0-9 ]+$/, "Only alphanumeric and spaces allowed")
    .min(1, "The name field is required."),
  description: z.string().min(1, "The description field is required."),
  price: z.coerce.number().min(0, "The price field is required."),
  stock: z.coerce.number().min(0, "The stock field is required."),
  category: z.coerce.number("The category field is required."),
  images: z.array(imageValidation),
});
