'use client'

import { BackgroundImage, Button, Card, PasswordInput, Stack, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { MdEmail, MdKey, MdLock } from 'react-icons/md'
import _ from 'lodash'

export function Login() {

    const [dataLogin, setDataLogin] = useState({ email: "", password: "" })
    const [loading, setLoading] = useState(false)

    const onLogin = async () => {
        setLoading(true)
        if (_.values(dataLogin).includes("")) return alert("Email dan Password harus diisi")

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataLogin)
        })

        if (res.status !== 200) return alert('wrong email or password')

        window.location.reload()
    }
    return <BackgroundImage src={"/img/bg.png"}>
        <Stack align="center" justify="center" w={"100%"} h={"100vh"}>
            <Card withBorder radius="md" shadow="md" maw={400} p={"lg"}>
                <Stack>
                    <Title>LOGIN</Title>
                    <Title order={5}>Wibu Server</Title>
                    <TextInput leftSection={<MdEmail />} label="Email" placeholder="Email" onChange={(e) => setDataLogin({ ...dataLogin, email: e.target.value })} />
                    <PasswordInput leftSection={<MdLock />} label="Password" placeholder="Password" onChange={(e) => setDataLogin({ ...dataLogin, password: e.target.value })} />
                    <Button loading={loading} onClick={onLogin}>LOGIN</Button>
                </Stack>
            </Card>
        </Stack>
    </BackgroundImage>

}