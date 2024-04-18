import { z } from "zod";

export const ButtonSchema = z.object({
  children: z.string().optional(),
  onClick: z.function(),
  id: z.string(),
  style: z
    .object({
      width: z.string().optional(),
      height: z.string().optional(),
      backgroundColor: z.string().optional(),
      color: z.string().optional(),
      borderRadius: z.string().optional(),
      fontSize: z.string().optional(),
      fontWeight: z.string().optional(),
      margin: z.string().optional(),
      padding: z.string().optional(),
      marginTop: z.string().optional(),
    })
    .optional(),
  className: z.string().optional(),
});
