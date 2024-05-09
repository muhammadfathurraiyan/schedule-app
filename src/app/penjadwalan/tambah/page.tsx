"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
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
import { createSchedule } from "@/lib/actions";

export default function page() {
  const session = useSession();

  if (!session.data) {
    redirect("/");
  }

  if (session.data.user.role !== "super-admin") {
    redirect("/dashboard");
  }

  const [date, setDate] = useState<Date>();

  console.log({ date });

  const createAction = async (data: FormData) => {
    const newSchedul = {
      instansi: data.get("instansi"),
      peserta: data.get("peserta"),
      tempat: data.get("tempat"),
      waktu: date,
      materi: data.get("materi"),
      jumlahPeserta: data.get("jumlahPeserta"),
      keterangan: data.get("keterangan"),
    };

    const result = ScheduleSchema.safeParse(newSchedul);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast({ title: "Ada kesalahan", description: issue.message });
      });
      return;
    }

    const response = await createSchedule(result.data);
    if (response.error.length > 0) {
      response.error.map((err) => {
        toast({ title: "Ada kesalahan", description: err });
      });
    }
  };
  return (
    <section className="pl-[19rem] py-4 pr-4">
      <h1 className="font-bold text-3xl capitalize">Tambah Akun</h1>
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
                  placeholder=""
                  autoComplete="instansi"
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
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="keterangan">Keterangan</Label>
                <Input
                  id="keterangan"
                  type="text"
                  name="keterangan"
                  autoComplete="keterangan"
                  required
                />
              </div>
            </div>
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
