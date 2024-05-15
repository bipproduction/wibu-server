import { ButtonLogout } from '@/ui/component/ButtonLogout';
import { NavAdmin } from '@/ui/component/NavAdmin';
import { LayoutAdmin } from '@/ui/layout/LayoutAdmin';
import { Login } from '@/ui/page/Login';
import app_config from '@/util/app_config';
import { Anchor, Badge, Button, Divider, Flex, Stack, Text, Title } from '@mantine/core';
import { cookies } from 'next/headers'

export default async function Layout({ children }: { children: React.ReactNode }) {
    const token = cookies().get('token')?.value
    const user = await fetch(app_config.host + '/api/auth/user', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if (user.status !== 200) return <Login />
    if (!token) return <Login />
    return <Stack  gap={0} w={"100%"}  style={{
        // overflow: "auto"
    }} >
        <Flex p={"sm"} 
        justify={"space-between"} 
        align={"center"} 
        pos={"sticky"} 
        top={0} 
        wrap={"wrap"}
        style={{
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 99
        }}>
            <Flex gap={"lg"} align={"center"} wrap={"wrap"}>
                <Anchor href='/'>
                    <Title order={3} c={"white"}>Wibu Server</Title>
                </Anchor>
                <Anchor href='/admin'>
                    <Badge>
                    <Text>Admin</Text>
                    </Badge>
                </Anchor>
            </Flex>
            <NavAdmin />
            <ButtonLogout />
        </Flex>
        <Divider color={"yellow"} />
        <LayoutAdmin>
            {children}
        </LayoutAdmin>
    </Stack>;
}