"use client";
import { Container, Stack, ActionIcon } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";
import Routes from "../../_routes";
import { useSearchParams } from "next/navigation";

export default function Page(){
    const { projectId, environmentId } = Routes.routes.project.envEdit.parse(useSearchParams());
    return (
        <Container w={"100%"}>
            <Stack>
                <ActionIcon
                    component={Link}
                    href={Routes.routes.project.detail.query({ projectId: projectId! })}
                >
                    <IconChevronLeft />
                </ActionIcon>
                {projectId}
                {environmentId}
            </Stack>
        </Container>
    );
}