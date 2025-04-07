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
  Text
} from "@mantine/core";
import { IconWorldWww } from "@tabler/icons-react";
import { useProxy } from "valtio/utils";

function ReleasesView() {
  return (
    <Stack bg={"dark.9"} p={"md"}>
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
          base: 2,
          md: 4,
        }}
      >
        {project.releases.list?.map((release) => (
          <Flex key={release} gap={"md"} align={"center"}>
            <Text>{release}</Text>
            <ActionIcon
              onClick={() => project.releases.assign({ release })}
              loading={project.releases.loading}
              variant="transparent"
              c={release === project.releases.current ? "green" : "dark"}
            >
              <IconWorldWww />
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
