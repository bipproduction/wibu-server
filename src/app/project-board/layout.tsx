import { ProjectBoardLayout } from "@/ui/project_board";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <ProjectBoardLayout>
        {children}
    </ProjectBoardLayout>;
}