import { z } from "zod";

export const InputSchema = z.object({
  placeholder: z.string().optional(),
  value: z.union([z.string(), z.number()]),
  onChange: z
    .function()
    .args(z.any())
    .returns(z.void()),
    type: z.union([
      z.literal('text'),
      z.literal('password'),
      z.literal('email'),
      z.literal('number'),
    ]),  name: z.string().optional(),
  id: z.string(),
  className: z.string().optional(),
  style: z.record(z.any()).optional(),
  required: z.boolean().optional(),
  label: z.string().optional()
});

export const SelectSchema = z.object({
  value: z.string(),
  name: z.string().optional(),
  id: z.string(),
  className: z.string().optional(),
  style: z
    .object({
      width: z.string().optional(),
      height: z.string().optional(),
    })
    .optional(),
  required: z.boolean().optional(),
  onChange: z.function(),
  label: z.string(),
});
