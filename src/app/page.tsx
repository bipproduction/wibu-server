import { Anchor, Flex, Stack, Title } from "@mantine/core";


export default function Home() {
  return (
    <Stack>
      <Flex p={"sm"} justify={"space-between"}>
        <Title order={4}>Wibu Server</Title>
        <Anchor href="/admin">Admin</Anchor>
      </Flex>
    </Stack>
  );
}
