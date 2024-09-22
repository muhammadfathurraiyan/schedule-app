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
import { redirect, useSearchParams } from "next/navigation";
import { UpdateAccountSchema } from "../../../../types/zodType";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { createAccount, updateAccount } from "@/lib/actions";

export default function page() {
  const session = useSession();
  const searchParams = useSearchParams();

  const user = {
    id: searchParams.get("id"),
    name: searchParams.get("name"),
    email: searchParams.get("email"),
    role: searchParams.get("role"),
  };

  if (session.status === "loading") {
    redirect("/akun");
  }

  const editAction = async (data: FormData) => {
    const newEditUser = {
      name: data.get("name"),
      role: data.get("role"),
      password: data.get("password"),
    };

    const result = UpdateAccountSchema.safeParse(newEditUser);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast({
          title: "Ada kesalahan",
          description: issue.message,
          variant: "destructive",
        });
      });
      return;
    }

    const response = await updateAccount(result.data, parseInt(user.id!));
    if (response.error.length > 0) {
      response.error.map((err) => {
        toast({
          title: "Ada kesalahan",
          description: err,
          variant: "destructive",
        });
      });
    }
  };

  return (
    <section className="pl-[19rem] py-4 pr-4">
      <h1 className="font-bold text-3xl capitalize">Edit Akun</h1>
      <div className="w-2/5 space-y-2 mt-4">
        <form action={editAction} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Nama</Label>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="John Doe"
              autoComplete="name"
              defaultValue={user.name ?? ""}
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
              defaultValue={user.email ?? ""}
              readOnly
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Reset Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Select name="role" defaultValue={user.role ?? ""}>
              <SelectTrigger>
                <SelectValue id="role" placeholder="Pilih role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  <SelectItem value="admin">user/karyawan</SelectItem>
                  <SelectItem value="super-admin">super-admin</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="w-fit">
              Edit
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
