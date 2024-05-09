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
import { Schedule } from "@prisma/client";
import { buttonVariants } from "../ui/button";
import { PencilLine } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export function TablePenjadwalan({ jadwal }: { jadwal?: Schedule[] }) {
  return (
    <Table>
      <TableCaption>List penjadwalan kegiatan.</TableCaption>
      <TableHeader className="bg-primary-foreground">
        <TableRow>
          <TableHead className="w-[50px]">No</TableHead>
          <TableHead>Instansi</TableHead>
          <TableHead>Peserta</TableHead>
          <TableHead>Jadwal</TableHead>
          <TableHead>Materi</TableHead>
          <TableHead>Jumlah Peserta</TableHead>
          <TableHead>Keterangan</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-[100px] text-center">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jadwal?.map((jadwal, index) => (
          <TableRow key={jadwal.id}>
            <TableCell className="text-center">{index + 1}</TableCell>
            <TableCell>{jadwal.instansi}</TableCell>
            <TableCell>{jadwal.peserta}</TableCell>
            <TableCell>{`${format(jadwal.waktu, "PPP", { locale: id })} ${
              jadwal.tempat
            }`}</TableCell>
            <TableCell>{jadwal.materi}</TableCell>
            <TableCell>{jadwal.jumlahPeserta}</TableCell>
            <TableCell>{jadwal.keterangan}</TableCell>
            <TableCell>{jadwal.status}</TableCell>
            <TableCell className="text-center grid grid-flow-col">
              {/* <Detail jadwal={jadwal} /> */}
              {/* <Link
                href={{
                  pathname: `/akun/edit`,
                  query: {
                    id: jadwal.id,
                    name: jadwal.name,
                    email: jadwal.email,
                    role: jadwal.role,
                  },
                }}
                className={buttonVariants({
                  variant: "ghost",
                  className: "hover:rounded-full",
                  size: "icon",
                })}
              >
                <PencilLine size={22} />
              </Link> */}
              {/* <AlertDelete jadwal={jadwal} /> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={9}>Total: {jadwal?.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
