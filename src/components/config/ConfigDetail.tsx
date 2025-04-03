import configState from "@/state/config";
import projectState from "@/state/projects";
import { CodeHighlight } from "@mantine/code-highlight";
import {
  ActionIcon,
  Button,
  Card,
  Flex,
  Group,
  Loader,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { Editor } from "@monaco-editor/react";
import {
  IconEdit,
  IconPlayerPlay,
  IconTrash,
  IconWorldWww,
} from "@tabler/icons-react";
import _ from "lodash";
import toast from "react-simple-toasts";
import stripAnsi from "strip-ansi";
import swr from "swr";
import { useProxy } from "valtio/utils";

function ConfigDetail({ name }: { name: string }) {
  const config = useProxy(configState);
  const project = useProxy(projectState);

  useShallowEffect(() => {
    if (name) {
      config.detail.load({ name });
    }
  }, [name]);

  return (
    <Stack>
      <Stack bg={"dark.9"} p={"md"}>
        <Title order={3}>{name}</Title>
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
        <LogView namespace={config.detail.name!} />
      </Card>
    </Stack>
  );
}

function ReleasesView() {
  const project = useProxy(projectState);
  return (
    <Stack>
      <Flex gap={"md"}>
        <Text size={"1.5rem"}>Releases</Text>
      </Flex>
      <SimpleGrid
        cols={{
          base: 1,
          md: 4,
        }}
      >
        {project.releases.list?.map((release) => (
          <Flex
            bg={release === project.releases.current ? "dark" : ""}
            justify={"space-between"}
            key={release}
            gap={"md"}
            align={"center"}
          >
            <Text c={release === project.releases.current ? "green.9" : "dark"}>
              {release}
            </Text>
            <ActionIcon
              onClick={() => project.releases.assign({ release })}
              loading={project.releases.loading}
              c={release === project.releases.current ? "green.9" : "dark"}
              variant="transparent"
            >
              <Tooltip label="Assign">
                <IconWorldWww />
              </Tooltip>
            </ActionIcon>
          </Flex>
        ))}
      </SimpleGrid>
    </Stack>
  );
}

function LogView({ namespace }: { namespace: string }) {
  const { data, isLoading } = swr(
    `/api/config/config-log/logs/build/${namespace}/log`,
    (url) => fetch(url).then((res) => res.json()),
    {
      refreshInterval: 2000,
    }
  );

  if (isLoading) return <Loader display={isLoading ? "block" : "none"} />;
  if (data.body === null)
    return (
      <Stack>
        {/* <Text>{`/api/config/config-log/logs/build/${namespace}/log`}</Text> */}
        <Text>Log not found</Text>
      </Stack>
    );
  return (
    <Stack>
      <Text>Log View</Text>
      <CodeHighlight
        code={stripAnsi(stripAnsi(_.values(data.body).join("\n")))}
        language="ruby"
      />
    </Stack>
  );
}

export default ConfigDetail;
