import configState from "@/state/config";
import { ActionIcon, Button, Group, Stack, Text } from "@mantine/core";
import { Editor } from "@monaco-editor/react";
import { IconEdit, IconPlayerPlay, IconTrash } from "@tabler/icons-react";
import toast from "react-simple-toasts";
import { useProxy } from "valtio/utils";

export function ConfigOption() {
  const config = useProxy(configState);
  return (
    <Stack bg={"dark.9"} p={"md"}>
      <Text size="1.5rem">Config</Text>
      <Button.Group>
        <Button
          variant="transparent"
          onClick={() => (configState.isEdit = !config.isEdit)}
        >
          <IconEdit />
        </Button>
        <Button
          loading={config.run.loading}
          variant="transparent"
          onClick={() => config.run.run({ name: config.detail.name! })}
        >
          <IconPlayerPlay />
        </Button>
        <ActionIcon
          variant="transparent"
          onClick={() =>
            config.configDelete.delete({ name: config.detail.name! })
          }
        >
          <IconTrash />
        </ActionIcon>
      </Button.Group>
      <Editor
        height="300px"
        theme="vs-dark"
        defaultLanguage="yaml"
        value={config.detail.text ?? ""}
        onChange={(e) => (configState.detail.text = e || null)}
        options={{
          readOnly: !config.isEdit,
        }}
      />
      <Group justify="right">
        <Button.Group>
          {config.isEdit && (
            <Button
              loading={config.create.loading}
              onClick={() => {
                config.create.create({
                  name: config.detail.name!,
                  text: config.detail.text!,
                });
                config.isEdit = false;
                toast("[SUCCESS] Config updated");
              }}
              variant="light"
            >
              Update
            </Button>
          )}
        </Button.Group>
      </Group>
    </Stack>
  );
}
