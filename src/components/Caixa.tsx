export default function Caixa(props: any) {
  return (
    <div className={`flex justify-center items-center p-3 bg-red-500 border-2 border-zinc-300 rounded-md ${props.className ?? ""}`}>
      <span>{props.texto}</span>
    </div>
  );
}
