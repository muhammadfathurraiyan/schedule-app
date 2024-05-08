import { z } from "zod";

export const SignUpSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "email harus lebih dari 1 karakter. \n" })
      .max(30, { message: "nama harus kurang dari 30 karakter. \n" }),
    email: z
      .string()
      .email("invalid email. \n")
      .min(1, { message: "email harus lebih dari 1 karakter. \n" })
      .max(30, { message: "email harus kurang dari 30 karakter. \n" }),
    role: z.string().min(1, { message: "role harus dipilih. \n" }),
    password: z
      .string()
      .min(8, { message: "password harus lebih dari 8 karakter. \n" }),
    confirmPassword: z
      .string()
      .min(8, { message: "password harus lebih dari 8 karakter. \n" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password tidak sesuai",
  });

export const SignInSchema = z.object({
  email: z
    .string()
    .email("email tidak valid. \n")
    .min(1, { message: "email harus lebih dari 1 karakter. \n" })
    .max(30, { message: "email harus kurang dari 30 karakter. \n" }),
  password: z
    .string()
    .min(8, { message: "password harus lebih dari 8 karakter. \n" }),
});
