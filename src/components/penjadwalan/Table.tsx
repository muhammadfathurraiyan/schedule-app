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
import { Schedule, User } from "@prisma/client";
import { buttonVariants } from "../ui/button";
import { PencilLine } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { AlertDelete } from "./AlertDelete";
import Detail from "./Detail";

export function TablePenjadwalan({
  jadwal,
}: {
  jadwal?: (Schedule & { user: User | null })[];
}) {
  return (
    <Table>
      <TableCaption>List penjadwalan kegiatan.</TableCaption>
      <TableHeader className="bg-primary-foreground">
        <TableRow>
          <TableHead className="w-[50px]">No</TableHead>
          <TableHead>Instansi</TableHead>
          <TableHead>Oleh</TableHead>
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
            <TableCell className="capitalize">{jadwal.instansi}</TableCell>
            <TableCell className="capitalize">{jadwal.user?.name}</TableCell>
            <TableCell className="capitalize">{jadwal.peserta}</TableCell>
            <TableCell className="capitalize">{`${format(jadwal.waktu, "PPP", {
              locale: id,
            })} ${jadwal.tempat}`}</TableCell>
            <TableCell className="capitalize">{jadwal.materi}</TableCell>
            <TableCell className="capitalize">{jadwal.jumlahPeserta}</TableCell>
            <TableCell className="capitalize">{jadwal.keterangan}</TableCell>
            <TableCell className="capitalize">{jadwal.status}</TableCell>
            <TableCell className="text-center grid grid-flow-col">
              <Detail jadwal={jadwal} />
              <Link
                href={{
                  pathname: `/penjadwalan/edit`,
                  query: {
                    id: jadwal.id,
                    instansi: jadwal.instansi,
                    peserta: jadwal.peserta,
                    waktu: jadwal.waktu.toString(),
                    tempat: jadwal.tempat,
                    materi: jadwal.materi,
                    jumlahPeserta: jadwal.jumlahPeserta,
                    keterangan: jadwal.keterangan,
                    status: jadwal.status,
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
              <AlertDelete jadwal={jadwal} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={10}>Total: {jadwal?.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
