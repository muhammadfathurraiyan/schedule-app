import { z } from "zod";

export const CreateAccountSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "nama harus lebih dari 1 karakter." })
      .max(30, { message: "nama harus kurang dari 30 karakter." }),
    email: z
      .string()
      .email("invalid email.")
      .min(1, { message: "email harus lebih dari 1 karakter." })
      .max(30, { message: "email harus kurang dari 30 karakter." }),
    role: z.string().min(1, { message: "role harus dipilih." }),
    password: z
      .string()
      .min(8, { message: "password harus lebih dari 8 karakter." })
      .optional(),
    confirmPassword: z
      .string()
      .min(8, { message: "password harus lebih dari 8 karakter." })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password tidak sesuai",
  });

export const UpdateAccountSchema = z.object({
  name: z
    .string()
    .min(1, { message: "email harus lebih dari 1 karakter." })
    .max(30, { message: "nama harus kurang dari 30 karakter." }),
  role: z.string().min(1, { message: "role harus dipilih." }),
  password: z.string().optional(),
});

export const SignInSchema = z.object({
  email: z
    .string()
    .email("email tidak valid.")
    .min(1, { message: "email harus lebih dari 1 karakter." })
    .max(30, { message: "email harus kurang dari 30 karakter." }),
  password: z
    .string()
    .min(8, { message: "password harus lebih dari 8 karakter." }),
});

export const ScheduleSchema = z.object({
  instansi: z
    .string()
    .min(1, { message: "nama instansi tidak boleh kosong." })
    .max(30, { message: "nama instansi terlalu panjang." }),
  peserta: z
    .string()
    .min(1, { message: "nama jenis peserta tidak boleh kosong." })
    .max(30, { message: "nama jenis peserta terlalu panjang." }),
  tempat: z
    .string()
    .min(1, { message: "nama tempat tidak boleh kosong." })
    .max(30, { message: "nama tempat terlalu panjang." }),
  waktu: z.date(),
  materi: z
    .string()
    .min(1, { message: "judul materi tidak boleh kosong." })
    .max(30, { message: "judul materi terlalu panjang." }),
  jumlahPeserta: z
    .string()
    .min(1, { message: "total peserta tidak boleh kosong." })
    .max(30, { message: "total peserta terlalu panjang." }),
  keterangan: z
    .string()
    .min(1, { message: "keterangan tidak boleh kosong." })
    .max(30, { message: "keterangan terlalu panjang." })
    .optional(),
});
