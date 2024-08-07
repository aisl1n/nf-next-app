import { Heart } from "lucide-react";
import React from "react";

export default function Rodape() {
  return (
    <footer>
      <div className="flex justify-end items-center bg-zinc-700 text-center p-4 gap-2 text-zinc-400 text-sm">
        <span>Desenvolvido com</span>
        <Heart size={18} fill="true" color="red" />
        <span>por Aisl1n - {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
