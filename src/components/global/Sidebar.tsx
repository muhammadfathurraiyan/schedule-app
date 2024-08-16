"use client";
import Link from "next/link";
import {
  Calendar,
  Gauge,
  LogOut,
  UserPlus,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function Sidebar() {
  const pathname = usePathname();
  const session = useSession();
  return (
    <aside
      className={`${
        !session.data && "hidden"
      } fixed left-0 h-[92%] flex flex-col justify-between border-r w-72 bg-primary-foreground`}
    >
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
        {session.data?.user.role === "super-admin" && (
          <Link
            href={"/akun"}
            className={`flex items-center py-2 px-3 hover:bg-accent rounded-md text-sm ${
              pathname === "/akun" && "bg-accent"
            }`}
          >
            <UserPlus className="mr-4 size-5" /> Manajemen Akun
          </Link>
        )}
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
      <div className="p-4 text-sm">
        <p>&copy; Kejaksaan Tinggi Aceh</p>
      </div>
    </aside>
  );
}
