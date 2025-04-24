import { Divider, Flex, Stack, Text } from "@mantine/core";
import { Loader } from "@mantine/core";

export default function Loading() {
  return (
    <Stack w={"100%"} h={"100vh"} justify="center" align="center">
      <Flex>
        <Text>Loading </Text>
        <Divider orientation="vertical" />
        <Loader />
      </Flex>
    </Stack>
  );
}
