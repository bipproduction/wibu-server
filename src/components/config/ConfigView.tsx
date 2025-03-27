import configState from "@/state/config";
import { Button, Stack, Title } from "@mantine/core";
import { useSnapshot } from "valtio";
import ConfigList from "./ConfigList";
import ConfigViewRun from "./ConfigRun";
import ConfigViewDelete from "./ConfigViewDelete";

function ConfigView() {
  return (
    <Stack>
      <Title order={2}>Config</Title>
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
  return <ConfigList />;
}

export default ConfigView;
