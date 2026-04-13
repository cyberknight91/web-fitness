import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email no valido"),
  password: z.string().min(6, "La contrasena debe tener al menos 6 caracteres"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Email no valido"),
    password: z.string().min(6, "La contrasena debe tener al menos 6 caracteres"),
    confirmPassword: z.string(),
    phone: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contrasenas no coinciden",
    path: ["confirmPassword"],
  });

export const contactSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  email: z.string().email("Email no valido"),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export const profileSchema = z.object({
  name: z.string().min(2),
  phone: z.string().optional(),
  age: z.number().int().positive().optional(),
  height: z.number().positive().optional(),
  weight: z.number().positive().optional(),
  goal: z.string().optional(),
});

export const progressLogSchema = z.object({
  weight: z.number().positive().optional(),
  chest: z.number().positive().optional(),
  waist: z.number().positive().optional(),
  hips: z.number().positive().optional(),
  leftArm: z.number().positive().optional(),
  rightArm: z.number().positive().optional(),
  leftLeg: z.number().positive().optional(),
  rightLeg: z.number().positive().optional(),
  notes: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type ProgressLogInput = z.infer<typeof progressLogSchema>;
