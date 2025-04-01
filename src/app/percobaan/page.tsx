'use client';
import notif from "@/lib/notif";
import { Button, Container } from "@mantine/core";

export default function Page() {
    return <Container>
        <Button onClick={() => {
            notif.success("success");
        }}>Button</Button>
        <Button onClick={() => {
            notif.error("error");
        }}>Button</Button>
        <Button onClick={() => {
            notif.info("info");
        }}>Button</Button>
        <Button onClick={() => {
            notif.warning("warning");
        }}>Button</Button>
    </Container>;
}