import configState from "@/state/config";
import { Stack, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { Editor } from "@monaco-editor/react";
import { useSnapshot } from "valtio";

function ConfigDetail() {
  const { detail } = useSnapshot(configState);

  useShallowEffect(() => {
    if (detail.name) {
      configState.detail.load();
    }
  }, [detail.name]);
  return (
    <Stack bg={"dark.9"} p={"md"}>
      <Title order={3}>Config Detail</Title>
      <Editor
        height="300px"
        theme="vs-dark"
        defaultLanguage="yaml"
        value={detail.text ?? ""}
        options={{
          readOnly: true,
          minimap: {
            enabled: false,
          },
          lineNumbers: "off",
          scrollBeyondLastLine: false,
        }}
      />
    </Stack>
  );
}

export default ConfigDetail;
