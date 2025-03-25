import configState from "@/state/config";
import { Button, Group, Stack, Text } from "@mantine/core";
import { useSnapshot } from "valtio";

function ConfigViewRun() {
    const config = useSnapshot(configState);
  return <Stack>
    {config.configList.list.map((item) => (
      <Group gap={"md"} key={item.name}>
        <Text>{item.name}</Text>
        <Button variant="light" onClick={() => {}}>
          Run
        </Button>
      </Group>
    ))}
  </Stack>;
}

export default ConfigViewRun;