"use server";
import { redirect } from "next/navigation";
import prisma from "./db";
import bcrypt from "bcrypt";
import {
  CreateAccountSchema,
  ScheduleSchema,
  UpdateAccountSchema,
} from "../../types/zodType";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export const createAccount = async (data: unknown) => {
  // server side validation
  const result = CreateAccountSchema.safeParse(data);
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
  const hashedPassword = await bcrypt.hash(result.data.password!, 10);

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

export const updateAccount = async (data: unknown, id: number) => {
  // server side validation
  const result = UpdateAccountSchema.safeParse(data);
  if (!result.success) {
    let errorMessage: string[] = [];
    result.error.issues.forEach((issue) => {
      errorMessage.push(issue.message);
    });
    return { error: errorMessage };
  }

  // hashing password
  if (result.data.password) {
    const hashedPassword = await bcrypt.hash(result.data.password, 10);
    // create user
    await prisma.user.update({
      data: {
        name: result.data.name,
        role: result.data.role,
        password: hashedPassword,
      },
      where: { id: id },
    });
  }

  await prisma.user.update({
    data: {
      name: result.data.name,
      role: result.data.role,
    },
    where: { id: id },
  });

  redirect("/akun");
};

export const deleteAccount = async (id: number) => {
  await prisma.user.delete({ where: { id: id } });
  redirect("/akun");
};

export const createSchedule = async (data: unknown) => {
  // server side validation
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/");
  }

  const result = ScheduleSchema.safeParse(data);
  if (!result.success) {
    let errorMessage: string[] = [];
    result.error.issues.forEach((issue) => {
      errorMessage.push(issue.message);
    });
    return { error: errorMessage };
  }

  // valdasi jika jadwal telah ada
  const existingSchedule = await prisma.schedule.findFirst({
    where: {
      waktu: result.data.waktu,
    },
  });

  if (existingSchedule) {
    return { error: ["Jadwal bentrok, silahkan ubah jadwal yang lain."] };
  }

  // create schecule
  await prisma.schedule.create({
    data: {
      ...result.data,
      user: { connect: { id: +session.user.id } },
    },
  });

  redirect("/penjadwalan");
};

export const updateSchedule = async (data: unknown, id: number) => {
  // server side validation
  const result = ScheduleSchema.safeParse(data);
  if (!result.success) {
    let errorMessage: string[] = [];
    result.error.issues.forEach((issue) => {
      errorMessage.push(issue.message);
    });
    return { error: errorMessage };
  }

  const session = await getServerSession(authOptions);

  // valdasi jika jadwal telah ada
  const existingSchedule = await prisma.schedule.findFirst({
    where: {
      waktu: result.data.waktu,
    },
  });

  const mySchedule = await prisma.schedule.findFirst({
    where: {
      userId: +session!.user.id,
      waktu: result.data.waktu,
    },
  });

  if (!mySchedule && existingSchedule && session?.user.role !== "super-admin") {
    return { error: ["Jadwal bentrok, silahkan ubah jadwal yang lain."] };
  }

  await prisma.schedule.update({
    data: {
      ...result.data,
    },
    where: { id: id },
  });

  redirect("/penjadwalan");
};

export const deleteSchedule = async (id: number) => {
  await prisma.schedule.delete({ where: { id: id } });
  redirect("/penjadwalan");
};
