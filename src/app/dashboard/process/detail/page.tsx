"use client";
import {
    ActionIcon,
    Container,
    Paper,
    Stack,
    Text
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { Editor } from "@monaco-editor/react";
import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useProxy } from "valtio/utils";
import Routes from "../../_routes";
import stateProcess from "../../_state/state-process";

export default function Page() {
  const { name } = Routes.routes.process.detail.parse(useSearchParams());
  const process = useProxy(stateProcess);

  useShallowEffect(() => {
    process.findUniq.load({ name: name! });
  }, [name]);
  return (
    <Container w={"100%"}>
      <Stack>
        <ActionIcon
          color="gray"
          component={Link}
          href={Routes.routes.process.get()}
        >
          <IconChevronLeft />
        </ActionIcon>
        <Text>{name}</Text>
        {process.findUniq.data && (
          <Paper p={"md"} withBorder>
            <Editor
              height={"520px"}
              value={JSON.stringify(process.findUniq.data, null, 2)}
              language="json"
              options={{
                readOnly: true,
                minimap: {
                  enabled: false,
                },
              }}
              theme="vs-dark"
            />
            {/* {Object.keys(process.findUniq.data).map((key, k) => (
              <Stack key={k}>
                <Grid key={k}>
                  <Grid.Col span={2}>
                    <Text>{key}</Text>
                  </Grid.Col>
                  <Grid.Col span={10}>
                    {JSON.stringify(process.findUniq.data[key]).startsWith(
                      "{"
                    ) ? (
                      <Stack gap={0}>
                        {Object.keys(process.findUniq.data[key]).map((k2) => (
                          <Stack key={k2}>
                            <Grid key={k2}>
                              <Grid.Col span={2}>
                                <Text lineClamp={1}>{k2}</Text>
                              </Grid.Col>
                              <Grid.Col span={10}>
                                <Text
                                  style={{
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word",
                                    wordWrap: "break-word",
                                  }}
                                >
                                  {JSON.stringify(
                                    process.findUniq.data[key][k2]
                                  )}
                                </Text>
                              </Grid.Col>
                            </Grid>
                            <Divider />
                          </Stack>
                        ))}
                      </Stack>
                    ) : (
                      <Text
                        style={{
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                          wordWrap: "break-word",
                        }}
                      >
                        {JSON.stringify(process.findUniq.data[key])}
                      </Text>
                    )}
                  </Grid.Col>
                </Grid>
                <Divider />
              </Stack>
            ))} */}
          </Paper>
        )}
      </Stack>
    </Container>
  );
}
