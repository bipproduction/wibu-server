'use client'
import { Stack } from "@mantine/core";

export function LayoutDashboard({ children }: { children: React.ReactNode }) {
    return <Stack>
        {children}
    </Stack>
}