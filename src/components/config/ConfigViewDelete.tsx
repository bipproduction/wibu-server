import configState from "@/state/config";
import { Button, Group, Radio, Stack } from "@mantine/core";
import { useSnapshot } from "valtio";

function ConfigViewDelete() {
  const { configList, configDelete } = useSnapshot(configState);
  return (
    <Stack>
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
