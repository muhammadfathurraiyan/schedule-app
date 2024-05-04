import Sidebar from "@/components/global/Sidebar";
import React from "react";

export default function page() {
  return (
    <main className="min-h-screen flex">
      <Sidebar />
      <section className="p-4">
        <h1 className="font-bold text-3xl">Dashboard</h1>
      </section>
    </main>
  );
}
