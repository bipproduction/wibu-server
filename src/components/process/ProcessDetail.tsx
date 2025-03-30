import processState from "@/state/process";
import { CodeHighlight } from "@mantine/code-highlight";
import {
  ActionIcon,
  Button,
  Flex,
  Grid,
  Loader,
  Stack,
  Text,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconChevronLeft, IconRefresh } from "@tabler/icons-react";
import _ from "lodash";
import Link from "next/link";
import { useProxy } from "valtio/utils";

function ProcessDetail({ name }: { name: string }) {
  const process = useProxy(processState);
  useShallowEffect(() => {
    if (name) {
      process.log.log({ name });
    }
  }, [name]);

  useShallowEffect(() => {
    process.processItem.item({ name });
  }, [name]);
  return (
    <Grid gutter={"md"}>
      <Grid.Col span={"content"}>
        <Stack bg={"dark.9"} p={"md"}>
          <Flex gap={"md"}>
            <ActionIcon
              variant="light"
              component={Link}
              href={"/admin/process"}
            >
              <IconChevronLeft />
            </ActionIcon>
            <Text size={"1.5rem"}>Process Detail</Text>
          </Flex>
          <Button.Group>
            <Button
              loading={process.loading}
              variant="light"
              onClick={() =>
                processState.restart({
                  namespace: name,
                })
              }
            >
              Restart
            </Button>
            <Button
              loading={process.loading}
              variant="light"
              onClick={() =>
                processState.reload({
                  namespace: name,
                })
              }
            >
              Reload
            </Button>
            <Button
              loading={process.loading}
              variant="light"
              onClick={() => processState.stop({ namespace: name })}
            >
              Stop
            </Button>
            <Button
              loading={process.loading}
              variant="light"
              onClick={() =>
                processState.remove({
                  namespace: name,
                })
              }
            >
              Remove
            </Button>
          </Button.Group>
          <Stack gap={"xs"}>
            {_.keys(process.processItem.data).map((key) => (
              <Flex key={key} gap={"md"}>
                <Text w={100}>{key}:</Text>
                <Text>{process.processItem.data?.[key]}</Text>
              </Flex>
            ))}
          </Stack>
        </Stack>
      </Grid.Col>
      <Grid.Col span={"auto"}>
        <Stack bg={"dark.9"} p={"md"}>
          <Flex gap={"md"} align={"center"}>
            <Text size={"1.5rem"}>Log</Text>
            <ActionIcon
              display={process.log.loading ? "none" : "block"}
              variant="light"
              onClick={() => processState.log.log({ name })}
            >
              <IconRefresh />
            </ActionIcon>
            <Loader
              size={"sm"}
              display={process.log.loading ? "block" : "none"}
            />
          </Flex>
          <CodeHighlight
            code={process.log.text || "[LOG]: loading ..."}
            language="log"
          />
        </Stack>
      </Grid.Col>
    </Grid>
  );
}

export default ProcessDetail;
