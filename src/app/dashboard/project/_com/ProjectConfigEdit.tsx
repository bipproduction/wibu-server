import { ActionIcon, Container, Divider, Stack } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";
import Routes from "../../_routes";
import { useParams } from "next/navigation";

export default function ProjectConfigEdit() {
  const { slug } = useParams();
  const [projectId] = slug || [];
  return (
    <Container w={"100%"}>
      <Stack>
        <ActionIcon component={Link} href={Routes.routes.project.detail.query({ projectId })}>
          <IconChevronLeft />
        </ActionIcon>
        <Divider label="Process Config" labelPosition="left" />
      </Stack>
    </Container>
  );
}
