"use client";
import ConfigCreate from "@/components/config/ConfigCreate";
import ConfigDetail from "@/components/config/ConfigDetail";
import { Container, Stack } from "@mantine/core";
import { useParams } from "next/navigation";

export default function Page() {
  const { config } = useParams();

  if (config?.[0] === "create") {
    return (
      <Container
        fluid
        w={{
          base: "100%",
          md: "80%",
        }}
      >
        <ConfigCreate />
      </Container>
    );
  }
  return (
    <Stack>
      <ConfigDetail name={config?.[0] as string} />
    </Stack>
  );
}
