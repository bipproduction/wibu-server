import { ActionIcon, Stack } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";
import Routes from "../../_routes";
import { useParams } from "next/navigation";

function ProjectEnvirontmentAdd() {
  const { slug } = useParams();
  const [projectId] = slug || [];
  return <Stack>
    <ActionIcon component={Link} href={Routes.routes.project.detail.query({ projectId })}>
      <IconChevronLeft />
    </ActionIcon>
  </Stack>;
}

export default ProjectEnvirontmentAdd;
