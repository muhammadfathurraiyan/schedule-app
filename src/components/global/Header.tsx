import { CalendarCheck } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 left-0 z-20 bg-background p-4 border-b">
      <div className="flex items-center gap-2 ">
        <Image src="/logo.png" alt="logo" width={500} height={500} className="size-10" />
        {/* <CalendarCheck size={32} className="text-primary" /> */}
        <h1 className="font-bold leading-none">
          Sistem Informasi <br /> Penjadwalan
        </h1>
      </div>
    </header>
  );
}
