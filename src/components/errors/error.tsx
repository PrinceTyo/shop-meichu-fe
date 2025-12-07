import { AlertCircle, Home, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ErrorComponentProps {
  title?: string;
  message?: string;
  statusCode?: number;
  reset?: () => void;
}

export function ErrorComponent({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  statusCode,
  reset,
}: ErrorComponentProps) {
  return (
    <div className="font-rubik min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-indigo-50 to-white">
      <div className="w-full max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-6">
          <AlertCircle className="w-8 h-8 text-indigo-600" />
        </div>

        {statusCode && (
          <p className="text-6xl font-light text-indigo-600 mb-2">
            {statusCode}
          </p>
        )}

        <h1 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600 mb-8">{message}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {reset && (
            <Button
              onClick={reset}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Try again
            </Button>
          )}
          <Button
            variant="outline"
            asChild
            className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 bg-white"
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Go home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
