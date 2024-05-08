"use server";
import { redirect } from "next/navigation";
import prisma from "./db";
import bcrypt from "bcrypt";
import { SignUpSchema } from "../../types/zodType";

export const createAccount = async (data: unknown) => {
  // server side validation
  const result = SignUpSchema.safeParse(data);
  if (!result.success) {
    let errorMessage: string[] = [];
    result.error.issues.forEach((issue) => {
      errorMessage.push(issue.message);
    });
    return { error: errorMessage };
  }

  // validasi jika email sudah terdaftar
  const existingUser = await prisma.user.findUnique({
    where: { email: result.data.email },
  });

  if (existingUser) {
    return { error: ["user dengan email ini sudah terdaftar."] };
  }

  // hashing password
  const hashedPassword = await bcrypt.hash(result.data.password, 10);

  // create user
  await prisma.user.create({
    data: {
      name: result.data.name,
      email: result.data.email,
      role: result.data.role,
      password: hashedPassword,
    },
  });

  redirect("/akun");
};

export const deleteAccount = async (id: number) => {
  await prisma.user.delete({ where: { id: id } });
  redirect("/akun");
};
