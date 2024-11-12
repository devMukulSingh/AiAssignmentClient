import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

const NavLinks = (props: Props) => {
  const pathName = usePathname();
  const links = [
    {
      title: "USERS",
      href: "/users",
      isActive: pathName.endsWith("/users"),
    },
    {
      title: "API KEYS",
      href: "/api-keys",
      isActive: pathName.endsWith("/api-keys"),
    },
    {
      title: "BOT",
      href: "/bot",
      isActive: pathName.endsWith("/bot"),
    },
  ];
  return (
    <div className="flex gap-10">
      {links.map((link, index) => (
        <Link
          className={cn(
            "transition-all duration-500  text-lg",`${link.isActive ? "font-bold underline text-slate-500  " : " "} `
          )
        }
          href={link.href}
          key={index}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
