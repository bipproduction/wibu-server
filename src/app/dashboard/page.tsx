"use client";
import { Container } from "@mantine/core";
import { ProjectView } from "./_components/project/ProjectView";

export default function Page() {
  return (
    <Container
      fluid
      bg={"100%"}
      w={{
        base: `100%`,
        md: "90%",
      }}
    >
      <ProjectView />
    </Container>
  );
}
