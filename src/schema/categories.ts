import { imageValidation } from "./template";
import * as z from "zod";

export const upsertCategorySchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z0-9 ]+$/, "Only alphanumeric and spaces allowed")
    .min(1, "The name field is required."),
  backgroundColor: z
    .string()
    .regex(
      /^#[0-9A-Fa-f]{6}$/,
      "Must be a valid hex color code (e.g., #FF5733)"
    )
    .min(1, "Background color is required"),
  thumbnail: imageValidation,
  heading: z.object({
    title: z.string().min(1, "The title field is required."),
    description: z.string().min(1, "The description field is required."),
    thumbnail: imageValidation,
  }),
});
