"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur"
      style={{
        background: "linear-gradient(180deg, rgba(253,250,245,0.96) 0%, rgba(253,250,245,0.88) 100%)",
        borderBottom: "1px solid rgba(23,20,15,0.1)",
        boxShadow: "0 1px 0 rgba(200,69,44,0.14), 0 8px 20px -16px rgba(23,20,15,0.35)",
      }}
    >
      <nav className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-xl tracking-tight text-neutral-900 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fdfaf5]"
        >
          Kamal Ahsan
        </Link>
        <ul className="flex gap-1 sm:gap-2 text-[15px]">
          {links.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    "relative px-3 py-1.5 rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fdfaf5] " +
                    (active
                      ? "text-neutral-900 font-semibold bg-neutral-900/[0.06]"
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-900/[0.04]")
                  }
                >
                  {link.label}
                  {active && (
                    <span
                      className="absolute left-3 right-3 -bottom-[5px] h-[2.5px] rounded-full"
                      style={{ background: "linear-gradient(90deg, #c8452c, #eaa64a)" }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
