import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogClose,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import { User } from "@prisma/client";

export default function Detail({ user }: { user: User }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"ghost"} className="rounded-full">
          <Eye size={22} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Detail Akun</DialogTitle>
          <DialogDescription>
            Detail akun dengan email {user.email}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Nama</Label>
            <Input
              id="name"
              type="text"
              name="name"
              value={user.name}
              readOnly
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={user.email}
              readOnly
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Role</Label>
            <Input
              id="role"
              type="text"
              name="role"
              value={user.role}
              readOnly
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Kembali
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
