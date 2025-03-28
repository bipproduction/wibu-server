import configState from "@/state/config";
import { Button, CloseButton, Flex, Stack, Title } from "@mantine/core";
import { useSnapshot } from "valtio";
import ConfigCreate from "./ConfigCreate";
import ConfigList from "./ConfigList";
import ConfigViewRun from "./ConfigRun";
import ConfigViewDelete from "./ConfigViewDelete";
import Link from "next/link";

function ConfigView() {
  return (
    <Stack>
      <Flex>
        <CloseButton component={Link} href={"/admin"} />
        <Title order={2}>Config</Title>
      </Flex>
      <Button.Group>
        <Button variant="light" onClick={() => (configState.selected = "list")}>
          List
        </Button>
        <Button variant="light" onClick={() => (configState.selected = "run")}>
          Run
        </Button>
        <Button
          variant="light"
          onClick={() => (configState.selected = "delete")}
        >
          Delete
        </Button>
        <Button
          variant="light"
          onClick={() => (configState.selected = "create")}
        >
          Create
        </Button>
      </Button.Group>
      <Container />
    </Stack>
  );
}

function Container() {
  const config = useSnapshot(configState);

  if (config.selected === "list") {
    return <ConfigList />;
  }
  if (config.selected === "run") {
    return <ConfigViewRun />;
  }
  if (config.selected === "delete") {
    return <ConfigViewDelete />;
  }
  if (config.selected === "create") {
    return <ConfigCreate />;
  }
  return <ConfigList />;
}

export default ConfigView;
