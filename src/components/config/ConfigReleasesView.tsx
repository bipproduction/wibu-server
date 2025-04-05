import configState from "@/state/config";
import projectState from "@/state/projects";
import {
  Stack,
  Flex,
  SimpleGrid,
  ActionIcon,
  Tooltip,
  Text,
  Card,
  Image,
} from "@mantine/core";
import { IconWorldWww } from "@tabler/icons-react";
import { useProxy } from "valtio/utils";

function ReleasesView() {
  return (
    <Stack>
      <Flex gap={"md"}>
        <Text size={"1.5rem"}>Releases</Text>
      </Flex>
      <Flex gap={"md"}>
        <ScreenShotView />
        <ReleaseListView />
      </Flex>
    </Stack>
  );
}

function ReleaseListView() {
  const project = useProxy(projectState);
  return (
    <Card>
      <SimpleGrid
        cols={{
          base: 1,
          md: 4,
        }}
      >
        {project.releases.list?.map((release) => (
          <Flex
            bg={release === project.releases.current ? "dark" : ""}
            justify={"space-between"}
            key={release}
            gap={"md"}
            align={"center"}
          >
            <Text c={release === project.releases.current ? "green.9" : "dark"}>
              {release}
            </Text>
            <ActionIcon
              onClick={() => project.releases.assign({ release })}
              loading={project.releases.loading}
              c={release === project.releases.current ? "green.9" : "dark"}
              variant="transparent"
            >
              <Tooltip label="Assign">
                <IconWorldWww />
              </Tooltip>
            </ActionIcon>
          </Flex>
        ))}
      </SimpleGrid>
    </Card>
  );
}

function ScreenShotView() {
  const config = useProxy(configState);
  return (
    <Card w={"300"}>
      <Image
        w={"100%"}
        src={`/api/config/screenshot/${config.detail.json?.name}/${config.detail.json?.namespace}`}
        alt={"screenshot"}
      />
    </Card>
  );
}

export default ReleasesView;
