
import { LayoutDashboard } from "@/ui/dashboard";
import { Stack } from "@mantine/core";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <LayoutDashboard>{children}</LayoutDashboard>
}