import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteSchedule } from "@/lib/actions";
import { Schedule, User } from "@prisma/client";
import { Trash } from "lucide-react";

export function AlertDelete({ jadwal }: { jadwal: Schedule }) {
  const deleteClientAction = async (data: FormData) => {
    "use server";
    const id = data.get("id") as unknown as string;
    if (id) {
      await deleteSchedule(parseInt(id));
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={"icon"} variant={"ghost"} className="rounded-full">
          <Trash size={22} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apa anda yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Anda akan menghapus penjadwalan ini. Aksi ini tidak dapat di
            kembalikan, Apa anda yakin ingin menghapus penjadwalan ini secara
            permanen?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <form action={deleteClientAction}>
            <input type="hidden" name="id" value={jadwal.id} />
            <Button type="submit" variant={"destructive"}>
              Hapus
            </Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
