'use client'
import ProcessDetail from "@/components/process/ProcessDetail";
import { Stack } from "@mantine/core";
import { useParams } from "next/navigation";

export default function Page() {
  const { slug } = useParams();
  return <Stack>
    <ProcessDetail name={slug as string} />
  </Stack>;
}