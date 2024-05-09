import { TablePenjadwalan } from "@/components/penjadwalan/Table";
import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const jadwal = await prisma.schedule.findMany();
  return (
    <section className="pl-[19rem] py-4 pr-4">
      <h1 className="font-bold text-3xl">Penjadwalan</h1>
      <div className="space-y-2 mt-4">
        <Link href="/penjadwalan/tambah" className={buttonVariants()}>
          Tambah
        </Link>
        <TablePenjadwalan jadwal={jadwal} />
      </div>
    </section>
  );
}
