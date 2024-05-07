"use client";
import Link from "next/link";
import {
  Calendar,
  CalendarCheck,
  FolderKanban,
  Gauge,
  LogOut,
  UserPlus,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

export default function Sidebar() {
  const pathname = usePathname();
  // const session = getServerSession(authOptions);
  // console.log(session);
  return (
    <aside className="border-r w-72 relative bg-primary-foreground">
      <div className="py-4 px-4 flex items-center gap-2 border-b justify-center">
        <CalendarCheck size={50} />
        <h1 className="font-bold text-xl leading-none">
          Sistem Informasi Penjadwalan
        </h1>
      </div>
      <nav className="space-y-1 p-4">
        <Link
          href={"/dashboard"}
          className={`flex items-center py-2 px-3 hover:bg-accent rounded-md text-sm ${
            pathname === "/dashboard" && "bg-accent"
          }`}
        >
          <Gauge className="mr-4 size-5" /> Dashboard
        </Link>
        <Link
          href={"/penjadwalan"}
          className={`flex items-center py-2 px-3 hover:bg-accent rounded-md text-sm ${
            pathname === "/penjadwalan" && "bg-accent"
          }`}
        >
          <Calendar className="mr-4 size-5" /> Penjadwalan
        </Link>
        <Link
          href={"/akun"}
          className={`flex items-center py-2 px-3 hover:bg-accent rounded-md text-sm ${
            pathname === "/akun" && "bg-accent"
          }`}
        >
          <UserPlus className="mr-4 size-5" /> Manajemen Akun
        </Link>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className={`flex w-full items-center py-2 px-3 hover:bg-accent rounded-md text-sm ${
            pathname === "/" && "bg-accent"
          }`}
        >
          <LogOut className="mr-4 size-5" /> Logout
        </button>
      </nav>
      <div className="absolute bottom-4 px-4 text-sm">
        <p>&copy; Kejaksaan Tinggi Aceh</p>
      </div>
    </aside>
  );
}
