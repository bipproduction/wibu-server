import configState from "@/state/config";
import projectState from "@/state/projects";
import {
  ActionIcon,
  Box,
  Flex,
  Grid,
  Image,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Tooltip
} from "@mantine/core";
import { IconWorldWww } from "@tabler/icons-react";
import { useProxy } from "valtio/utils";

function ReleasesView() {
  return (
    <Stack>
      <Flex gap={"md"}>
        <Text size={"1.5rem"}>Releases</Text>
      </Flex>
      <Grid gutter={"md"}>
        <Grid.Col
          span={{
            base: 12,
            sm: 3,
          }}
        >
          <Box>
            <ScreenShotView />
          </Box>
        </Grid.Col>
        <Grid.Col
          span={{
            base: 12,
            sm: 9,
          }}
        >
          <Box>
            <ReleaseListView />
          </Box>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}

function ReleaseListView() {
  const project = useProxy(projectState);

  if (!project.releases.list) return <Skeleton h={320} />;
  return (
    <Box>
      <SimpleGrid
        cols={{
          base: 1,
          md: 3,
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
    </Box>
  );
}

function ScreenShotView() {
  const config = useProxy(configState);
  return (
    <Stack>
      <Image
        src={`/api/config/screenshot/${config.detail.json?.name}/${config.detail.json?.namespace}`}
        alt={"screenshot"}
        style={{
          width: "100%",
          objectFit: "cover",
        }}
      />
    </Stack>
  );
}

export default ReleasesView;
