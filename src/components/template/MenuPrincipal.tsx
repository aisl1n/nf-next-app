import React from "react";
import MenuItem from "./MenuItem";
import { AppWindow, Layout, ListCheck, TestTube } from "lucide-react";

export default function MenuPrincipal() {
  return (
    <aside className="w-80 bg-zinc-900">
      <nav className="flex flex-col p-5">
        <MenuItem link="/primeiro">
          <TestTube />
          <span>Primeiro componente</span>
        </MenuItem>
        <MenuItem link="/flexbox">
          <Layout />
          <span>Flexbox</span>
        </MenuItem>
        <MenuItem link="/pagina">
          <AppWindow />
          <span>Componente Página</span>
        </MenuItem>
        <MenuItem link="/estado">
          <ListCheck />
          <span>Componente com Estado</span>
        </MenuItem>
      </nav>
    </aside>
  );
}
