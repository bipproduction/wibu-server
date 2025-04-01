"use client";
import ConfigCreate from "@/components/config/ConfigCreate";
import ConfigDetail from "@/components/config/ConfigDetail";
import { useParams } from "next/navigation";

export default function Page() {
  const { config } = useParams();

  if (config?.[0] === "create") {
    return <ConfigCreate />;
  }
  return <ConfigDetail name={config?.[0] as string} />;
}
