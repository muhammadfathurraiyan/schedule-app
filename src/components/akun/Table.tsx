import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@prisma/client";
import { PencilLine } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { AlertDelete } from "./AlertDelete";
import Detail from "./Detail";

export function TableAkun({ users }: { users: User[] }) {
  return (
    <Table>
      <TableCaption>List tabel admin/karyawan dan super admin.</TableCaption>
      <TableHeader className="bg-primary-foreground">
        <TableRow>
          <TableHead className="w-[50px]">No</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="w-[100px] text-center">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={user.id}>
            <TableCell className="text-center">{index + 1}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role === "admin" ? "user/karyawan" : user.role}</TableCell>
            <TableCell className="text-center grid grid-flow-col">
              <Detail user={user} />
              <Link
                href={{
                  pathname: `/akun/edit`,
                  query: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                  },
                }}
                className={buttonVariants({
                  variant: "ghost",
                  className: "hover:rounded-full",
                  size: "icon",
                })}
              >
                <PencilLine size={22} />
              </Link>
              <AlertDelete user={user} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total: {users.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
