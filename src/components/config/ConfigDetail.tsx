import configState from "@/state/config";
import projectState from "@/state/projects";
import {
  Button,
  CloseButton,
  Flex,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { Editor } from "@monaco-editor/react";
import { IconEdit, IconPlayerPlay } from "@tabler/icons-react";
import { useSnapshot } from "valtio";

function ConfigDetail() {
  const { detail, run, isEdit } = useSnapshot(configState);
  const project = useSnapshot(projectState);

  if (project.releases.list) {
    return <ReleasesView />;
  }

  return (
    <Stack bg={"dark.9"} p={"md"}>
      <Title order={3}>Config Detail</Title>
      <Button.Group>
        <Button
          variant="transparent"
          onClick={() => (configState.isEdit = !isEdit)}
        >
          <Tooltip label={"edit"}>
            <IconEdit />
          </Tooltip>
        </Button>
        <Button
          loading={run.loading}
          variant="transparent"
          onClick={() => configState.run.run({ name: detail.name! })}
        >
          <Tooltip label="Run">
            <IconPlayerPlay />
          </Tooltip>
        </Button>
        <Button
          variant="transparent"
          onClick={() =>
            projectState.releases.load({
              name: detail.json?.name as string,
              namespace: detail.json?.namespace as string,
            })
          }
        >
          <Text>releases</Text>
        </Button>
      </Button.Group>
      <Text>{detail.name}</Text>
      <Editor
        height="300px"
        theme="vs-dark"
        defaultLanguage="yaml"
        value={detail.text ?? ""}
        onChange={(e) => (configState.detail.text = e || null)}
        options={{
          readOnly: !isEdit,
        }}
      />
      <Button.Group>
        {isEdit && (
          <Button
            loading={configState.create.loading}
            onClick={() => {
              configState.create.create({
                name: detail.name!,
                text: detail.text!,
              });
            }}
            variant="light"
          >
            Update
          </Button>
        )}
      </Button.Group>
    </Stack>
  );
}

function ReleasesView() {
  return (
    <Stack bg={"dark.9"} p={"md"}>
      <Flex gap={"md"}>
        <CloseButton onClick={() => (projectState.releases.list = null)} />
        <Text size={"1.5rem"}>Releases</Text>
      </Flex>
      <Stack>
        {projectState.releases.list?.map((release) => (
          <Flex bg={release === projectState.releases.current ? "dark.8" : ""} key={release} gap={"md"} align={"center"}>
            <Text
              key={release}
            >
              {release}
            </Text>
            <Button onClick={() => projectState.releases.assign({ release })} loading={projectState.releases.loading} c={release === projectState.releases.current ? "green.9" : "dark"} variant="transparent">Assign</Button>
          </Flex>
        ))}
      </Stack>
    </Stack>
  );
}

export default ConfigDetail;
