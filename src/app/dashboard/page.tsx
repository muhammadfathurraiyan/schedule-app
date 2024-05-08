import Sidebar from "@/components/global/Sidebar";
import { createAccount } from "@/lib/actions";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  return (
    <section className="pl-[19rem] py-4 pr-4">
      <h1 className="font-bold text-3xl">Dashboard</h1>
    </section>
  );
}
