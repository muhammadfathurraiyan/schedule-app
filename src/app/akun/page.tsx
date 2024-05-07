import Sidebar from "@/components/global/Sidebar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  return (
    <main className="min-h-screen flex">
      <Sidebar />
      <section className="p-4">
        <h1 className="font-bold text-3xl">Manajemen Akun</h1>
      </section>
    </main>
  );
}
