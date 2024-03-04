"use client";

import { Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import * as actions from "@/actions";

export default function SearchInput() {
  const searchParams = useSearchParams();

  // console.log(searchParams);

  return (
    <form action={actions.Search}>
      <Input name = "term" defaultValue={searchParams.get("term") || ""} />
    </form>
  );
}
