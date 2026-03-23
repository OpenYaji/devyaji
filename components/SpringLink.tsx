"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SpringLink({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "relative inline-block group",
        className
      )}
    >
      <span>{children}</span>
      <motion.span
        className="absolute left-0 bottom-0 w-full h-[1px] bg-current origin-right scale-x-0"
        whileHover={{
          scaleX: 1,
          originX: 0,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
        initial={{ scaleX: 0, originX: 1 }}
        exit={{
          scaleX: 0,
          originX: 1,
            transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
      />
    </a>
  );
}
