'use client'
import { Button } from "@mantine/core";
import { useState } from "react";

export function ButtonLogout() {
    const [loading, setLoading] = useState(false)
    const logout = async () => {
        setLoading(true)
        const res = await fetch('/api/auth/logout')

        if (res.status === 200) window.location.href = '/admin'
    }

    return <Button loading={loading} size='compact-sm' variant='subtle' onClick={logout}>Logout</Button>
}