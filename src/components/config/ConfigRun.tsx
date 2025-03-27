import configState from "@/state/config";
import {
  Button,
  Flex,
  Notification,
  Stack,
  Text,
  Title,
  Tooltip
} from "@mantine/core";
import { IconPlayerPlay } from "@tabler/icons-react";
import { useSnapshot } from "valtio";

function ConfigViewRun() {
  const config = useSnapshot(configState);
  return (
    <Stack bg={"dark.9"} p={"md"}>
      <Title order={3}>Run Config</Title>
      {config.run.message && (
        <Notification
          title="Notification"
          onClose={() => (configState.run.message = null)}
        >
          {config.run.message}
        </Notification>
      )}
      {config.configList.list.map((item, index) => (
        <Flex gap={"md"} key={item.name} align={"center"}>
          <Text>{index + 1}</Text>
          <Text>{item.name}</Text>
          <Button
            loading={config.run.loading}
            variant="transparent"
            onClick={() => configState.run.run({ name: item.name })}
          >
            <Tooltip label="Run">
              <IconPlayerPlay />
            </Tooltip>
          </Button>
        </Flex>
      ))}
    </Stack>
  );
}

export default ConfigViewRun;
