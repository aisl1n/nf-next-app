import React from "react";
import Logo from "./Logo";
import MenuUsuario from "./MenuUsuario";

type Props = {};

export default function Cabecalho({}: Props) {
  return (
    <div>
      <header className="flex items-center gap-5 px-5 bg-zinc-800 h-20">
        <Logo />
        <span className="flex grow">Cabeçalho</span>
        <MenuUsuario />
      </header>
    </div>
  );
}
