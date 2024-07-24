import React from "react";
import Link from "next/link";

export default function MenuItem(props: any) {
  return (
    <Link href={props.link} className="flex gap-1 hover:bg-blue-500 py-2 px-4 rounded-md">
      {props.children}
    </Link>
  );
}
