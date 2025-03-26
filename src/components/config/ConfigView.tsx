import configState from "@/state/config";
import {
  Box,
  Button,
  Flex,
  Notification,
  Stack,
  Text,
  Title
} from "@mantine/core";
import { useFileDialog } from "@mantine/hooks";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import ConfigViewRun from "./ConfigRun";
import ConfigViewDelete from "./ConfigViewDelete";

function ConfigView() {
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
    <Stack>
      <Title order={3}>Config</Title>
      <Flex>
        <Notification
          onClose={() => (configState.notif = null)}
          title="Notification"
          display={etc.notif ? "block" : "none"}
        >
          {etc.notif}
        </Notification>
      </Flex>
      <Box
        style={{
          width: "100%",
          overflow: "scroll",
        }}
      >
        <Button variant="light" onClick={() => fileDialog.open()}>
          Upload Config
        </Button>
        <Stack gap={0}>
          {etc.configList.list.map((item, index) => (
            <Flex key={index} gap={"md"}>
              <Text>{index + 1}</Text>
              <Text w={"460"}>{item.name}</Text>
              <Text>{item.path}</Text>
            </Flex>
          ))}
        </Stack>
      </Box>
      <ConfigViewDelete />
      <ConfigViewRun />
    </Stack>
  );
}

export default ConfigView;
