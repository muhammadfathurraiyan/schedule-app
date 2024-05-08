"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { redirect } from "next/navigation";
import { SignUpSchema } from "../../../../types/zodType";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { createAccount } from "@/lib/actions";

export default function page() {
  const session = useSession();

  if (!session.data) {
    redirect("/");
  }

  if (session.data.user.role !== "super-admin") {
    redirect("/dashboard");
  }

  const createAction = async (data: FormData) => {
    const newUser = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
      role: data.get("role"),
    };

    const result = SignUpSchema.safeParse(newUser);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast({ title: "Ada kesalahan", description: issue.message });
      });
      return;
    }

    const response = await createAccount(result.data);
    if (response.error.length > 0) {
      response.error.map((err) => {
        toast({ title: "Ada kesalahan", description: err });
      });
    }
  };

  return (
    <section className="pl-[19rem] py-4 pr-4">
      <h1 className="font-bold text-3xl capitalize">Tambah Akun</h1>
      <div className="w-2/5 space-y-2 mt-4">
        <form action={createAction} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Nama</Label>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="John Doe"
              autoComplete="name"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              autoComplete="email"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Konfirmasi Password</Label>
            <Input
              id="password"
              type="password"
              name="confirmPassword"
              autoComplete="current-password"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Select name="role">
              <SelectTrigger>
                <SelectValue id="role" placeholder="Pilih role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  <SelectItem value="admin">admin</SelectItem>
                  <SelectItem value="super-admin">super-admin</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="w-fit">
              Tambah
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
