import configState from "@/state/config";
import projectState from "@/state/projects";
import { ActionIcon, Container, Flex, Stack, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useProxy } from "valtio/utils";
import ConfigLogView from "./ConfigLogView";
import { ConfigOption } from "./ConfigOption";
import ReleasesView from "./ConfigReleasesView";
import { IconChevronLeft } from "@tabler/icons-react";

function ConfigView({ name }: { name: string }) {
  const config = useProxy(configState);
  const project = useProxy(projectState);

  useShallowEffect(() => {
    if (name && !config.detail.text) {
      config.detail.load({ name });
    }
  }, [name]);

  return (
    <Stack>
      <Flex gap={"md"} align={"center"}>
        <ActionIcon
          variant="transparent"
          onClick={() => (window.location.href = "/admin/config")}
        >
          <IconChevronLeft />
        </ActionIcon>
        <Text size="1.5rem">{name}</Text>
      </Flex>
      {project.releases.list && <ReleasesView />}
      <Container
        fluid
        w={{
          base: "100%",
          sm: "80%",
        }}
      >
        <ConfigOption />
      </Container>
      <Container
        fluid
        w={{
          base: "100%",
          sm: "80%",
        }}
      >
        <ConfigLogView namespace={config.detail.name!} />
      </Container>
    </Stack>
  );
}

export default ConfigView;
