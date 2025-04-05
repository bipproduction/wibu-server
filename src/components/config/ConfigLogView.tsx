import { CodeHighlight } from "@mantine/code-highlight";
import { Stack, Text, Loader } from "@mantine/core";
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

  if (isLoading) return <Loader display={isLoading ? "block" : "none"} />;
  if (data.body === null)
    return (
      <Stack>
        <Text bg={"orange"} p={"md"}>
          Log not found
        </Text>
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

export default ConfigLogView;
