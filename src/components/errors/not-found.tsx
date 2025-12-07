"use client";

import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 font-rubik p-6">
      <h1 className="text-7xl font-extrabold text-indigo-600">404</h1>

      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        Oops! Page Not Found
      </h2>

      <p className="mt-2 text-gray-600 dark:text-gray-400 text-center">
        The page you're looking for doesn’t exist or has been moved.
      </p>

      <div className="btn-wrap mt-8 flex flex-col sm:flex-row gap-4">
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
      </div>
    </div>
  );
}
