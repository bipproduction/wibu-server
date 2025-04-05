"use client";

import { signIn } from "@/lib/auth-client";
import { Button, Container, Image, Paper, Stack } from "@mantine/core";
import { useState } from "react";
import toast from "react-simple-toasts";

export default function Page() {
  const [loading, setLoading] = useState(false);
  return (
    <Stack>
      <Container>
        <Stack>
            <Paper bg={"white"}>
              <Image src={"/gh.svg"} alt="" w={"200"} />
            </Paper>
          <Button
            variant="outline"
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
      </Container>
    </Stack>
  );
}
