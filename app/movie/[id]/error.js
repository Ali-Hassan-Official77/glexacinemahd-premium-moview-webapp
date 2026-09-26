"use client";
import { useRouter } from "next/navigation";
import ErrorState from "@/components/ErrorState";
export const runtime = 'edge';

export default function Error({ error }) {
  const router = useRouter();
  return (
    <ErrorState
      message={error.message}
      buttonLabel="Try Again"
      onAction={() => router.push("/")}
    />
  );
}