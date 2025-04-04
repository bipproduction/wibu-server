/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { signIn, signOut } from "@/lib/auth-client";
import { Button, Container, Flex, Group, Stack } from "@mantine/core";

import { createAuthClient } from "better-auth/react";
import { useState } from "react";
const { useSession } = createAuthClient();

export default function Page() {
  const [loading, setLoading] = useState(false);
  return (
    <Container>
      <Flex>
        <Button
          loading={loading}
          onClick={async () => {
            setLoading(true);
            signIn
              .social({ provider: "github" })
              .then((data) => {
                if (data.error) {
                  console.error(data.error);
                  return;
                }
              })
              .catch((err) => {
                console.error("catch", err);
              })
              .finally(() => {
                setLoading(false);
              });
          }}
        >
          login
        </Button>
      </Flex>
      <Stack>
        <User />
      </Stack>
    </Container>
  );
}

function User() {
  const [loading, setLoading] = useState(false);
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = useSession();
  return (
    <Stack>
      {session?.user.name}
      {isPending && "Loading..."}
      {error && "Error"}

      <Group>
        <Button
          loading={loading}
          onClick={async () => {
            setLoading(true);
            signOut()
              .then((data) => {
                if (error) {
                  console.error(error);
                  return;
                }
                console.log(data.data);
                window.location.href = "/";
              })
              .catch((err) => {
                console.error("catch", err);
              })
              .finally(() => {
                setLoading(false);
              });
          }}
        >
          sign out
        </Button>
      </Group>
    </Stack>
  );
}
