"use client";
import { Button, Container, Flex, Stack } from "@mantine/core";
import { Text } from "@mantine/core";
import DomainView from "./_com/DomainView";
import { IconReload } from "@tabler/icons-react";
import stateDomain from "../_state/state-domain";
import { useProxy } from "valtio/utils";

export default function Page() {
  const domain = useProxy(stateDomain);
  return (
    <Container w={"100%"}>
      <Stack>
        <Flex gap={"md"} align={"center"}>
          <Text size="2rem" fw={"bold"}>
            Domains
          </Text>
          <Button
            loading={domain.config.loading}
            onClick={domain.config.syncConfig}
            size="compact-xs"
            variant="white"
            leftSection={<IconReload />}
          >
            sync
          </Button>
        </Flex>
        <DomainView />
      </Stack>
    </Container>
  );
}
