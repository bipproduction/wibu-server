import processState from "@/state/process";
import { Button, CloseButton, Flex, Stack, Text } from "@mantine/core";
import _ from "lodash";
import { useSnapshot } from "valtio";

function ProcessDetail() {
  const process = useSnapshot(processState);
  return (
    <Stack bg={"dark.9"} p={"md"}>
      <Flex>
        <CloseButton onClick={() => (processState.selected = null)} />
        <Text size={"1.5rem"}>Process Detail</Text>
      </Flex>
      <Button.Group>
        <Button loading={process.loading} variant="light" onClick={() => processState.restart({ namespace: process.selected?.namespace })}>Restart</Button>
        <Button loading={process.loading} variant="light" onClick={() => processState.reload({ namespace: process.selected?.namespace })}>Reload</Button>
        <Button loading={process.loading} variant="light" onClick={() => processState.stop({ namespace: process.selected?.namespace })}>Stop</Button>
        <Button loading={process.loading} variant="light" onClick={() => processState.remove({ namespace: process.selected?.namespace })}>Remove</Button>
      </Button.Group>
      {_.keys(process.selected).map((key) => (
        <Flex key={key}>
          <Text w={"200"}>{key}</Text>
          <Text>{process.selected?.[key]}</Text>
        </Flex>
      ))}
    </Stack>
  );
}

export default ProcessDetail;
