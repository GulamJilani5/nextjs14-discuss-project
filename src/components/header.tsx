import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import HeaderAuth from "@/components/header-auth";
import SearchInput from "@/components/topics/search-input";
import { Suspense } from "react";

export default function Header() {
  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href="/" className="font-bold">
          Discuss
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          {/* We can place fallback but not necessarily, wrapping SearchInput inside Suspense because
           nextjs gives warning if we use useSearchParams without Suspense*/}
          <Suspense>
            <SearchInput />
          </Suspense>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
}
