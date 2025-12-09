"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function ActionButton() {
  const router = useRouter();

  return (
    <>
      <Button
        onClick={() => router.back()}
        variant="outline"
        size="lg"
        className="flex items-center gap-2 bg-white cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-purple-200 hover:border-purple-400 dark:border-purple-600 dark:hover:border-purple-400"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Go Back
      </Button>

      <Button
        asChild
        size="lg"
        className="flex items-center gap-2 cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-xl bg-indigo-600 hover:bg-indigo-700 text-white border-0"
      >
        <Link href="/">
          <Home className="h-4 w-4 group-hover:rotate-12 transition-transform" />
          Back to Home
        </Link>
      </Button>
    </>
  );
}
