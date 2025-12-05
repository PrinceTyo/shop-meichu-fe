"use client";

import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFoundView() {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="notfound-container min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 p-6">
      <h1 className="title text-7xl font-extrabold text-purple-600 dark:text-purple-400 animate-pulse">
        404
      </h1>

      <h2 className="subtitle mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
        Oops! Page Not Found
      </h2>

      <p className="desc mt-2 text-gray-600 dark:text-gray-400 text-center max-w-md">
        The page you're looking for doesn’t exist or has been moved.
      </p>

      <div className="btn-wrap mt-8 flex flex-col sm:flex-row gap-4">
        <Button
          onClick={handleGoBack}
          variant="outline"
          size="lg"
          className="flex items-center gap-2 bg-white cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-purple-200 hover:border-purple-400 dark:border-purple-600 dark:hover:border-purple-400"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Go Back
        </Button>

        <Button
          onClick={handleGoHome}
          size="lg"
          className="flex items-center gap-2 cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-xl bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
        >
          <Home className="h-4 w-4 group-hover:rotate-12 transition-transform" />
          Back to Home
        </Button>
      </div>
    </div>
  );
}
