import { Stack } from "@mantine/core";
import { ButtonCreateProject } from "../component";

export function ProjectBoardLayout({ children }: { children: React.ReactNode }) {
    return <Stack>
        <ButtonCreateProject />
        {children}
    </Stack>;
}