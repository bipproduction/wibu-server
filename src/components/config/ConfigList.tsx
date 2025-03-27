import configState from "@/state/config";
import {
  Button,
  Flex,
  Group,
  Notification,
  Stack,
  Text
} from "@mantine/core";
import { useFileDialog } from "@mantine/hooks";
import { IconFile } from "@tabler/icons-react";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import ConfigDetail from "./ConfigDetail";

function ConfigList() {
  return (
    <Stack>
      <List />
    </Stack>
  );
}

function List() {
  const etc = useSnapshot(configState);
  const fileDialog = useFileDialog({ accept: ".yml" });
  useEffect(() => {
    configState.configList.load();
  }, []);

  useEffect(() => {
    if (fileDialog.files) {
      const name = fileDialog.files[0].name;
      configState.configUpload.upload({ file: fileDialog.files[0], name });
    }
  }, [fileDialog.files]);
  return (
    <Stack bg={"dark.9"} p={"md"} flex={0}>
      <Text size={"1.5rem"}>Config List</Text>
      <Flex>
        <Notification
          onClose={() => (configState.notif = null)}
          title="Notification"
          display={etc.notif ? "block" : "none"}
        >
          {etc.notif}
        </Notification>
      </Flex>
      <Stack
        style={{
          width: "100%",
          overflow: "scroll",
        }}
      >
        <Group>
          <Button variant="light" onClick={() => fileDialog.open()}>
            Upload Config
          </Button>
        </Group>
        <Stack gap={"xs"}>
          {etc.configList.list.map((item, index) => (
            <Flex key={index} gap={"md"}>
              <Text>{index + 1}</Text>
              <Text>{item.name}</Text>
              <Text>{item.path}</Text>
              <Button
                variant="transparent"
                onClick={() => (configState.detail.name = item.name)}
              >
                <IconFile />
              </Button>
            </Flex>
          ))}
        </Stack>
      </Stack>
      {configState.detail.name && <ConfigDetail />}
    </Stack>
  );
}



export default ConfigList;
