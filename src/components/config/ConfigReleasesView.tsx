import projectState from "@/state/projects";
import { Stack, Flex, SimpleGrid, ActionIcon, Tooltip, Text } from "@mantine/core";
import { IconWorldWww } from "@tabler/icons-react";
import { useProxy } from "valtio/utils";

function ReleasesView() {
    const project = useProxy(projectState);
    return (
      <Stack>
        <Flex gap={"md"}>
          <Text size={"1.5rem"}>Releases</Text>
        </Flex>
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
      </Stack>
    );
  }

  export default ReleasesView;