'use client'
import { Anchor, Badge, Flex } from "@mantine/core"
import { useShallowEffect } from "@mantine/hooks"
import { useState } from "react"

const list_menu = [
    {
        "id": "app",
        "name": "List App",
        "path": "/admin/app"
    },
    {
        "id": "project",
        "name": "List Project",
        "path": "/admin/project"
    },
    {
        "id": "server",
        "name": "List Server",
        "path": "/admin/server"
    }
]

export function NavAdmin() {
    const [location, setLocation] = useState("/app")

    useShallowEffect(() => {
        setLocation(window.location.pathname)
    }, [])

    return <Flex gap={"lg"}>
        {list_menu.map((item) => (
            <Anchor href={item.path} key={item.id}><Badge bg={location === item.path ? "yellow" : "gray"}>{item.name}</Badge></Anchor>
        ))}
    </Flex>
}