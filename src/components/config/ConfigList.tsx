import configState from "@/state/config";
import {
  Button,
  Flex,
  Group,
  Notification,
  SimpleGrid,
  Stack,
  Text,
  Title,
  UnstyledButton
} from "@mantine/core";
import { useFileDialog, useShallowEffect } from "@mantine/hooks";
import Editor from '@monaco-editor/react';
import { useEffect } from "react";
import { useSnapshot } from "valtio";

function ConfigList() {
  return (
    <Stack>
      <SimpleGrid cols={2}>
        <List />
        <ConfigDetail />
      </SimpleGrid>
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
            <Flex
              key={index}
              gap={"md"}
            >
              <Text>{index + 1}</Text>
              <Text w={"460"}>{item.name}</Text>
              <Text>{item.path}</Text>
              <Button variant="transparent" onClick={() => (configState.detail.name = item.name)}>
                View
              </Button>
            </Flex>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}

function ConfigDetail() {
  const { detail } = useSnapshot(configState);

  useShallowEffect(() => {
    if (detail.name) {
      configState.detail.load();
    }
  }, [detail.name]);
  return (
    <Stack bg={"dark.9"} p={"md"}>
      <Title order={3}>Config Detail</Title>
      <Editor height="300px" theme="vs-dark" defaultLanguage="yaml" value={detail.text ?? ""} options={{
        readOnly: true,
        minimap: {
          enabled: false
        },
        lineNumbers: "off",
        scrollBeyondLastLine: false
      }} />
    </Stack>
  );
}

export default ConfigList;
