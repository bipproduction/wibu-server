"use client";
import ProcessView from "@/components/process/ProcessView";
import { CloseButton, Stack } from "@mantine/core";
import Link from "next/link";

export default function Page() {
  return (
    <Stack>
      <CloseButton component={Link} href={"/admin"} />
      <ProcessView />
    </Stack>
  );
}
