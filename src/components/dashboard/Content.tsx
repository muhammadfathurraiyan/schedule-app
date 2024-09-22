"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { Schedule } from "@prisma/client";
import { CalendarCheck2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { Calendar } from "../ui/calendar";

export default function Content({ jadwal }: { jadwal: Schedule[] }) {
  const [detail, setDetail] = useState<Schedule>();
  const [isSelected, setIsSelected] = useState(false);
  const handleSelected = (jadwal: Schedule) => {
    setDetail(jadwal);
    setIsSelected(false);
    setTimeout(() => {
      setIsSelected(true);
    });
  };

  const status: { [key: string]: string } = {
    Pending: "Yang Akan Dilaksanakan",
    "di terima": "Yang Sudah Dilaksanakan",
    "di tolak": "Yang Belum Dilaksanakan",
  };
  return (
    <div className="mt-4 grid grid-cols-6 gap-4">
      <div className="col-span-4 grid grid-cols-3 gap-4 h-fit">
        <Card className="col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Penjadwalan</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Dashboard Penjadwalan Dinamis untuk Manajemen Data Penjadwalan dan
              Analisis Data Penjadwalan.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/penjadwalan/tambah" className={buttonVariants()}>
              Tambah
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <CalendarCheck2 size={18} /> Total Penjadwalan
            </CardDescription>
            <CardTitle className="text-4xl">{jadwal.length}</CardTitle>
          </CardHeader>
          <CardFooter>
            <div className="text-xs text-muted-foreground text-balance">
              Total penjadwalan kegiatan yang terdaftar.
            </div>
          </CardFooter>
        </Card>
        <Card className="col-span-3">
          <CardHeader className="pb-4">
            <CardTitle>Tabel Jadwal Kegiatan</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <CalendarCheck2 size={18} /> Jadwal kegiatan terbaru.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>List penjadwalan kegiatan.</TableCaption>
              <TableHeader className="bg-primary-foreground">
                <TableRow>
                  <TableHead className="w-[50px]">No</TableHead>
                  <TableHead>Instansi</TableHead>
                  <TableHead>Peserta</TableHead>
                  <TableHead>Jadwal</TableHead>
                  <TableHead>Materi</TableHead>
                  <TableHead className="w-[100px] text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jadwal?.map((jadwal, index) => (
                  <TableRow key={jadwal.id}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="capitalize">
                      {jadwal.instansi}
                    </TableCell>
                    <TableCell className="capitalize">
                      {jadwal.peserta}
                    </TableCell>
                    <TableCell className="capitalize">{`${format(
                      jadwal.waktu,
                      "PPP",
                      {
                        locale: id,
                      }
                    )} ${jadwal.tempat}`}</TableCell>
                    <TableCell className="capitalize">
                      {jadwal.materi}
                    </TableCell>
                    <TableCell className="text-center grid grid-flow-col">
                      <Button
                        type="button"
                        onClick={() => {
                          handleSelected(jadwal);
                        }}
                        variant={"link"}
                      >
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={6}>Total: {jadwal?.length}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </div>
      {isSelected && (
        <div className="col-span-2">
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  Kegiatan: {detail?.materi}
                </CardTitle>
                <CardDescription>
                  Tanggal: {format(detail!.waktu, "PPP", { locale: id })}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              <div className="grid gap-3">
                {/* <div className="font-semibold">Jadwal</div> */}
                <Calendar
                  locale={id}
                  mode="single"
                  selected={detail?.waktu}
                  today={detail?.waktu}
                  className="rounded-md border"
                />
                <Separator className="my-4" />
                <div className="font-semibold">Detail</div>
                <ul className="grid gap-3 capitalize">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Instansi</span>
                    <span>{detail?.instansi}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Peserta</span>
                    <span>{detail?.peserta}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Tempat</span>
                    <span>{detail?.tempat}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Materi</span>
                    <span>{detail?.materi}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Jumlah Peserta
                    </span>
                    <span>{detail?.jumlahPeserta}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span>{status[detail!.status]}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Keterangan</span>
                    <span>{detail?.keterangan}</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
              <div className="text-xs text-muted-foreground">
                Detail Jadwal Kegiatan
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
