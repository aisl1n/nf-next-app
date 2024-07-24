import React from "react";

function anoAtual() {
  return new Date().getFullYear();
}
export const teste = () => {};

export default function page() {
  return (
    <div>
      <h1>Primeiro</h1>
      <div className="flex flex-col">
        <span>{1 + 1}</span>
        <span>{Math.random()}</span>
        <span>{anoAtual()}</span>
      </div>
    </div>
  );
}
