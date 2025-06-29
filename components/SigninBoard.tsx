'use client'
import { useState } from "react";
import RoleModal from "@/components/RoleModal";

export default function SignInPage() {
  // Modal open by default
  const [open, setOpen] = useState(true);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F172A] via-[#151A2E] to-[#1A223A]">
      <RoleModal open={open} onClose={() => setOpen(false)} />
    </main>
  );
}