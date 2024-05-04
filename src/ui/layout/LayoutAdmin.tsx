'use client'

import { Stack } from "@mantine/core"
import { useShallowEffect } from "@mantine/hooks"
import { useState } from "react"

export function LayoutAdmin({ children }: { children: React.ReactNode }) {
    return <Stack gap={0}>
        {children}
    </Stack>
}