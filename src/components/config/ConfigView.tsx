import { useSnapshot } from "valtio";
import configState from "@/state/config";
import { useFileDialog } from "@mantine/hooks";
import { useEffect } from "react";
import { Box, Button, Flex, Notification, Stack } from "@mantine/core";
import ConfigViewDelete from "./ConfigViewDelete";
import ConfigViewRun from "./ConfigRun";

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
        <code>
          <pre>{etc.configList.table}</pre>
        </code>
      </Box>
      <ConfigViewDelete />
      <ConfigViewRun />
    </Stack>
  );
}

export default ConfigView;

