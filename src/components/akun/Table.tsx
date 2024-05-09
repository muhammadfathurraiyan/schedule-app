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
import { Button, buttonVariants } from "../ui/button";
import { Eye, PencilLine, Trash } from "lucide-react";
import Detail from "./Detail";
import { AlertDelete } from "./AlertDelete";
import Link from "next/link";

const invoices = [
  {
    invoice: "1",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "1",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "1",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "1",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "1",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "1",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "1",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export function TableAkun({ users }: { users: User[] }) {
  return (
    <Table>
      <TableCaption>List tabel admin dan super admin.</TableCaption>
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
            <TableCell>{user.role}</TableCell>
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
