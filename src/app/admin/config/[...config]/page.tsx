"use client";
import ConfigCreate from "@/components/config/ConfigCreate";
import ConfigView from "@/components/config/ConfigView";
import { Container } from "@mantine/core";
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
  return <ConfigView name={config?.[0] as string} />;
}
