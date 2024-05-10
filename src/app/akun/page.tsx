import { TableAkun } from "@/components/akun/Table";
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

  if (session?.user.role !== "super-admin") {
    redirect("/dashboard");
  }

  const users = await prisma.user.findMany({ orderBy: { id: "asc" } });
  return (
    <>
      <section className="pl-[19rem] py-4 pr-4">
        <h1 className="font-bold text-3xl">Manajemen Akun</h1>
        <div className="w-4/5 space-y-2 mt-4">
          <Link href="/akun/tambah" className={buttonVariants()}>
            Tambah
          </Link>
          <TableAkun users={users} />
        </div>
      </section>
    </>
  );
}
