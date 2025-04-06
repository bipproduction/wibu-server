import { CodeHighlight } from "@mantine/code-highlight";
import { Skeleton, Stack, Text } from "@mantine/core";
import _ from "lodash";
import stripAnsi from "strip-ansi";
import swr from "swr";

function ConfigLogView({ namespace }: { namespace: string }) {
  const { data, isLoading } = swr(
    `/api/config/config-log/logs/build/${namespace}/log`,
    (url) => fetch(url).then((res) => res.json()),
    {
      refreshInterval: 2000,
    }
  );

  if (isLoading) return <Skeleton h={460} />;
  if (data.body && data.body.length === 0)
    return (
      <Stack>
        <Text bg={"orange"} p={"md"}>
          Log not found
        </Text>
      </Stack>
    );
  return (
    <Stack bg={"dark.9"} p={"md"}>
      <Text size="1.5rem">Log View</Text>
      <CodeHighlight
        code={stripAnsi(stripAnsi(_.values(data.body).join("\n")))}
        language="ruby"
      />
    </Stack>
  );
}

export default ConfigLogView;
