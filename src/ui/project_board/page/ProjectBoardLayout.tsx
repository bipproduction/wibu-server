import { Stack } from "@mantine/core";
import { CreateProjectView } from "../component";


export function ProjectBoardLayout({ children }: { children: React.ReactNode }) {
    return <Stack>
        {/* <CreateProjectView /> */}
        {children}
    </Stack>;
}