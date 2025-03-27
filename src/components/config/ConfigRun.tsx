import configState from "@/state/config";
import { Button, Group, Stack, Text } from "@mantine/core";
import { Title } from "@mantine/core";
import { useSnapshot } from "valtio";

function ConfigViewRun() {
    const config = useSnapshot(configState);
  return <Stack bg={"dark.9"} p={"md"}>
    <Title order={3}>Run Config</Title>
    {config.configList.list.map((item) => (
      <Group gap={"md"} key={item.name}>
        <Text>{item.name}</Text>
        <Button variant="light" onClick={() => configState.run.now({ name: item.name })}>
          Run
        </Button>
      </Group>
    ))}
  </Stack>;
}

export default ConfigViewRun;