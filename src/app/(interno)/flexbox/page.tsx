import Caixa from "@/components/Caixa";
import React from "react";

type Props = {};

export default function Flexbox({}: Props) {
  return (
      <div className="h-96 w-[500px]">
        <h1>Flexbox</h1>
        <div className="bg-zinc-700 flex justify-between items-start h-full gap-5">
          <Caixa texto="#1" className="w-24" />
          <Caixa texto="#2" className="flex-grow" />
          <Caixa texto="#3" />
        </div>
      </div>
  );
}
