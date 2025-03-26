import configState from "@/state/config";
import { Button, Group, Radio, Stack, Title } from "@mantine/core";
import { useSnapshot } from "valtio";

function ConfigViewDelete() {
  const { configList, configDelete } = useSnapshot(configState);
  return (
    <Stack bg={"dark.9"} p={"md"}>
      <Title order={3}>Delete Config</Title>  
      <Radio.Group>
        {configList.list.map((item) => (
          <Group key={item.name} gap={"md"} p={"xs"}>
            <Radio
              onChange={() => (configState.configDelete.name = item.name)}
              label={item.name}
              value={item.name}
            />
          </Group>
        ))}
      </Radio.Group>
      <Group>
        <Button
          variant="light"
          onClick={() => {
            configDelete.delete();
          }}
        >
          Delete
        </Button>
      </Group>
    </Stack>
  );
}

export default ConfigViewDelete;
