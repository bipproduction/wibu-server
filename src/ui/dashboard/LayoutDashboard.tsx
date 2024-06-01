'use client'
import { Box, Button, Stack, Text } from "@mantine/core";
import { ScrollLoader } from 'next-scroll-loader'
import { ButtonToogle, DevBox } from 'next-dev'

export function LayoutDashboard({ children }: { children: React.ReactNode }) {
    return <Stack >
        
        <DevBox path="dnNjb2RlOi8vZmlsZS8vVXNlcnMvYmlwL0RvY3VtZW50cy9wcm9qZWN0cy9iaXAvd2lidS1zZXJ2ZXIvc3JjL3VpL2Rhc2hib2FyZC9MYXlvdXREYXNoYm9hcmQudHN4Ojk6MQ==">
            <ScrollLoader url="/api/test-scroll" take={30} height={"200px"}>
                {(data) => <Box >
                    {data.name}
                </Box>}
            </ScrollLoader>
        </DevBox>
        {children}
    </Stack>
}