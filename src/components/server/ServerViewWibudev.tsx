import serverState from "@/state/server";
import { Button, Flex, Group, Stack, Text, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { useSnapshot } from "valtio";

function ServerViewWibuDev() {
  const { wibudev } = useSnapshot(serverState);
  const [isEdit, setIsEdit] = useState(false);
  useShallowEffect(() => {
    wibudev.load();
  }, []);

  function Edit() {
    return <div>{JSON.stringify(wibudev.json)}</div>;
  }

  function View() {
    return (
      <Stack>
        <Stack gap={0}>
          {wibudev.json.map((item, index) => (
            <Flex key={index} gap={"md"}>
              <Text>{index + 1}</Text>
              <Text w={"460"}>{item.name}</Text>
              <Text>{item.ports.join(",").trim()}</Text>
            </Flex>
          ))}
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack bg={"dark.9"} p={"md"}>
      <Title order={3}>WibuDev</Title>
      <Group>
        <Button variant="light" onClick={() => setIsEdit(!isEdit)}>
          {isEdit ? "Close" : "Edit"}
        </Button>
      </Group>
      {isEdit ? <Edit /> : <View />}
    </Stack>
  );
}

export default ServerViewWibuDev;
