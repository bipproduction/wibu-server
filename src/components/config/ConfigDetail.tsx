import configState from "@/state/config";
import projectState from "@/state/projects";
import {
  ActionIcon,
  Button,
  Card,
  Flex,
  Group,
  Stack,
  Title,
  Tooltip
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { Editor } from "@monaco-editor/react";
import {
  IconChevronLeft,
  IconEdit,
  IconPlayerPlay,
  IconTrash,
} from "@tabler/icons-react";
import toast from "react-simple-toasts";
import { useProxy } from "valtio/utils";
import ConfigLogView from "./ConfigLogView";
import ReleasesView from "./ConfigReleasesView";

function ConfigDetail({ name }: { name: string }) {
  const config = useProxy(configState);
  const project = useProxy(projectState);

  useShallowEffect(() => {
    if (name && !config.detail.text) {
      config.detail.load({ name });
    }
  }, [name]);

  return (
    <Stack>
      <Stack bg={"dark.9"} p={"md"}>
        <Flex gap={"md"} align={"center"}>
          <ActionIcon
            variant="transparent"
            onClick={() => (window.location.href = "/admin/config")}
          >
            <IconChevronLeft />
          </ActionIcon>
          <Title order={3}>{name}</Title>
        </Flex>
        <Button.Group>
          <Button
            variant="transparent"
            onClick={() => (configState.isEdit = !config.isEdit)}
          >
            <Tooltip label={"edit"}>
              <IconEdit />
            </Tooltip>
          </Button>
          <Button
            loading={config.run.loading}
            variant="transparent"
            onClick={() => config.run.run({ name: config.detail.name! })}
          >
            <Tooltip label="Run">
              <IconPlayerPlay />
            </Tooltip>
          </Button>
          <Tooltip
            label="Delete"
            onClick={() =>
              config.configDelete.delete({ name: config.detail.name! })
            }
          >
            <ActionIcon variant="transparent">
              <Tooltip label="Delete">
                <IconTrash />
              </Tooltip>
            </ActionIcon>
          </Tooltip>
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
      <Card bg={"dark.9"}>{project.releases.list && <ReleasesView />}</Card>
      <Card bg={"dark.9"}>
        <ConfigLogView namespace={config.detail.name!} />
      </Card>
    </Stack>
  );
}

export default ConfigDetail;
