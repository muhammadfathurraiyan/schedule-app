import Content from "@/components/dashboard/Content";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const jadwal = await prisma.schedule.findMany({ orderBy: { id: "desc" }, where: {status: "di terima"} });
  return (
    <section className="pl-[19rem] py-4 pr-4">
      <h1 className="font-bold text-3xl">Dashboard</h1>
      <p className="text-sm text-muted-foreground">
        Hallo {session.user.name} selamat datang di sistem informasi penjadwalan
      </p>
      <Content jadwal={jadwal} />
    </section>
  );
}
