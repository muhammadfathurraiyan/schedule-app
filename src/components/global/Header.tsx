import { CalendarCheck } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 left-0 z-20 bg-primary-foreground p-4 border-b">
      <div className="flex items-center gap-2 ">
        <CalendarCheck size={32} />
        <h1 className="font-bold text-lg leading-none">
          Sistem Informasi Penjadwalan
        </h1>
      </div>
    </header>
  );
}
