import { Stack, Title } from "@mantine/core";
import ProcessList from "./ProcessList";

function ProcessView() {
  return (
    <Stack>
      <Title order={2}>Process</Title>
      <ProcessList />
    </Stack>
  );
}


export default ProcessView;
