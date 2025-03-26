import {
  Stack,
  Title
} from "@mantine/core";
import ConfigList from "./ConfigList";
import ConfigViewRun from "./ConfigRun";
import ConfigViewDelete from "./ConfigViewDelete";

function ConfigView() {
 
  return (
    <Stack>
      <Title order={2}>Config</Title>
      <ConfigList />
      <ConfigViewDelete />
      <ConfigViewRun />
    </Stack>
  );
}



export default ConfigView;
