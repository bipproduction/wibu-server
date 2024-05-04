import { ButtonLogout } from '@/ui/component/ButtonLogout';
import { NavAdmin } from '@/ui/component/NavAdmin';
import { LayoutAdmin } from '@/ui/layout/LayoutAdmin';
import { Login } from '@/ui/page/Login';
import app_config from '@/util/app_config';
import { Anchor, Button, Divider, Flex, Stack, Text, Title } from '@mantine/core';
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
    return <Stack pos={"relative"} p={0} gap={0} >
        <Flex p={"sm"} justify={"space-between"} align={"center"} pos={"sticky"} top={0} bg={"black"} style={{
            zIndex: 99
        }}>
            <Flex gap={"lg"} align={"center"}>
                <Anchor href='/'>
                    <Title order={3} c={"white"}>Wibu Server</Title>
                </Anchor>
                <Anchor href='/admin'>
                    <Text>Admin</Text>
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