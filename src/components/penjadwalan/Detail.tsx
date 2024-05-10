"use client";
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
import { CalendarCheck2Icon, Eye } from "lucide-react";
import { Schedule } from "@prisma/client";
import { Calendar } from "../ui/calendar";
import { id } from "date-fns/locale";

export default function Detail({ jadwal }: { jadwal: Schedule }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"ghost"} className="rounded-full">
          <Eye size={22} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Detail Penjadwalan</DialogTitle>
          <DialogDescription>
            Detail jadwal dengan materi {jadwal.materi}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-flow-col gap-4">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="instansi">Instansi</Label>
              <Input
                id="instansi"
                type="text"
                name="instansi"
                autoComplete="instansi"
                placeholder="Instansi"
                defaultValue={jadwal.instansi ?? ""}
                readOnly
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="peserta">Peserta</Label>
              <Input
                id="peserta"
                type="text"
                name="peserta"
                placeholder="Mahasiswa"
                autoComplete="peserta"
                defaultValue={jadwal.peserta ?? ""}
                readOnly
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="materi">Materi</Label>
              <Input
                id="materi"
                type="text"
                name="materi"
                autoComplete="materi"
                placeholder="Materi"
                defaultValue={jadwal.materi ?? ""}
                readOnly
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="jumlahPeserta">Jumlah Peserta</Label>
              <Input
                id="jumlahPeserta"
                type="text"
                name="jumlahPeserta"
                autoComplete="jumlahPeserta"
                placeholder="100"
                defaultValue={jadwal.jumlahPeserta ?? ""}
                readOnly
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="keterangan">Keterangan</Label>
              <Input
                id="keterangan"
                type="text"
                name="keterangan"
                placeholder="Keterangan"
                autoComplete="keterangan"
                defaultValue={jadwal.keterangan ?? ""}
                readOnly
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Input
                id="status"
                type="text"
                name="status"
                placeholder="status"
                autoComplete="status"
                defaultValue={jadwal.status ?? ""}
                readOnly
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="tempat">Tempat</Label>
              <Input
                id="tempat"
                type="text"
                name="tempat"
                placeholder="tempat"
                autoComplete="tempat"
                defaultValue={jadwal.tempat ?? ""}
                readOnly
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="waktu">Waktu</Label>
              <Calendar
                locale={id}
                mode="single"
                selected={jadwal.waktu}
                className="rounded-md border"
              />
            </div>
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
