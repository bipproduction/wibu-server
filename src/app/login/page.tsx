"use client";

import { signIn } from "@/lib/auth-client";
import { Button, Stack } from "@mantine/core";
import { useState } from "react";
import toast from "react-simple-toasts";

export default function Page() {
  const [loading, setLoading] = useState(false);
  return (
    <Stack>
      <Button
        loading={loading}
        onClick={async () => {
          setLoading(true);
          signIn
            .social({
              provider: "github",
            })
            .then((v) => {
              console.log(v);
            })
            .catch((err) => {
              console.error(err);
              toast(JSON.stringify(err));
            })
            .finally(() => {
              setLoading(false);
            });
        }}
      >
        Login
      </Button>
    </Stack>
  );
}
