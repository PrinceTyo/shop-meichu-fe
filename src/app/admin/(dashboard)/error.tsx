"use client";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <h2 className="mb-5">Something went wrong!</h2>
      <Button className="w-fit" onClick={() => reset()}>
        Try again
      </Button>
    </>
  );
}
