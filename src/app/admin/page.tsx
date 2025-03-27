'use client'
import { Button } from "@mantine/core";
import Link from "next/link";

export default function Page(){
    return <div>
        <Button.Group>
            <Button variant="light" component={Link} href={"/admin/server"}>Server</Button>
            <Button variant="light" component={Link} href={"/admin/process"}>Process</Button>
            <Button variant="light" component={Link} href={"/admin/config"}>Config</Button>
        </Button.Group>
    </div>
}