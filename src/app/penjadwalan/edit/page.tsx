"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect, useSearchParams } from "next/navigation";
import { ScheduleSchema } from "../../../../types/zodType";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useState } from "react";
import { id } from "date-fns/locale";
import { updateSchedule } from "@/lib/actions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function page() {
  const session = useSession();
  const searchParams = useSearchParams();

  const jadwal = {
    id: searchParams.get("id"),
    instansi: searchParams.get("instansi"),
    peserta: searchParams.get("peserta"),
    waktu: searchParams.get("waktu"),
    tempat: searchParams.get("tempat"),
    materi: searchParams.get("materi"),
    jumlahPeserta: searchParams.get("jumlahPeserta"),
    keterangan: searchParams.get("keterangan"),
    status: searchParams.get("status"),
  };

  if (session.status === "loading") {
    redirect("/penjadwalan");
  }

  const [date, setDate] = useState<Date | undefined>(
    new Date(jadwal.waktu ?? "")
  );

  const createAction = async (data: FormData) => {
    const newSchedul = {
      instansi: data.get("instansi"),
      peserta: data.get("peserta"),
      tempat: data.get("tempat"),
      waktu: date,
      materi: data.get("materi"),
      jumlahPeserta: data.get("jumlahPeserta"),
      keterangan: data.get("keterangan"),
      status:
        session.data?.user.role === "super-admin"
          ? data.get("status")
          : jadwal.status,
    };

    const result = ScheduleSchema.safeParse(newSchedul);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast({ title: "Ada kesalahan", description: issue.message });
      });
      return;
    }

    const response = await updateSchedule(result.data, parseInt(jadwal.id!));
    if (response.error.length > 0) {
      response.error.map((err) => {
        toast({ title: "Ada kesalahan", description: err });
      });
    }
  };

  return (
    <section className="pl-[19rem] py-4 pr-4">
      <h1 className="font-bold text-3xl capitalize">Edit Jadwal</h1>
      <div className="w-2/3 space-y-2 mt-4">
        <form action={createAction} className="space-y-4">
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
                  required
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
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tempat">Tempat</Label>
                <Input
                  id="tempat"
                  type="text"
                  name="tempat"
                  autoComplete="tempat"
                  placeholder="Aceh Besar"
                  defaultValue={jadwal.tempat ?? ""}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="waktu">Waktu</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`justify-start text-left font-normal ${
                        !date && "text-muted-foreground"
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, "PPP", { locale: id })
                      ) : (
                        <span>Pilih Waktu</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      locale={id}
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="materi">Materi</Label>
                <Input
                  id="materi"
                  type="text"
                  name="materi"
                  autoComplete="materi"
                  placeholder="Materi"
                  defaultValue={jadwal.materi ?? ""}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="jumlahPeserta">Jumlah Peserta</Label>
                <Input
                  id="jumlahPeserta"
                  type="text"
                  name="jumlahPeserta"
                  autoComplete="jumlahPeserta"
                  placeholder="100"
                  defaultValue={jadwal.jumlahPeserta ?? ""}
                  required
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
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  name="status"
                  disabled={session.data?.user.role === "admin" ? true : false}
                  defaultValue={jadwal.status ?? ""}
                >
                  <SelectTrigger>
                    <SelectValue id="status" placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="di terima">Terima</SelectItem>
                      <SelectItem value="di tolak">Tolak</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
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
