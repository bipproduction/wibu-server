/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, Flex, Box, Divider, Text } from "@mantine/core";
import { IconGitBranch } from "@tabler/icons-react";
import _ from "lodash";
import { useProxy } from "valtio/utils";
import stateProject from "../../_state/state-project";

function ProjectEnvirontmentPreview() {
  const project = useProxy(stateProject);
  return (
    <Stack>
      {project.project.getEnvironment.data?.map((item) => (
        <Stack key={item.id} gap={"md"}>
          <Flex gap={"md"}>
            <Box w={200} h={200} bg={"gray"} />
            <Stack>
              <Text>{item.name}</Text>
              <Flex gap={"md"}>
                <IconGitBranch />
                <Text>{item.branch}</Text>
              </Flex>
            </Stack>
          </Flex>
          <Divider label="Env Config" labelPosition="left" />
          <Flex gap={"md"}>
            <Stack>
              {_.keys(item.env?.json).map((key) => (
                <Flex key={key} gap={"md"}>
                  <Text w={"200"} lineClamp={1}>
                    {key}
                  </Text>
                  <Text lineClamp={1}>*****</Text>
                </Flex>
              ))}
            </Stack>
          </Flex>
          <Divider label="Process Config" labelPosition="left" />
          <Flex gap={"md"}>
            <Flex>
              {(item.config?.json as any)["apps"]?.map((app: any) => (
                <Stack key={app.name} gap={"md"}>
                  <Text>{app.namespace}</Text>
                  <Text w={"200"} lineClamp={1}>
                    {app.name}
                  </Text>
                </Stack>
              ))}
            </Flex>
          </Flex>
        </Stack>
      ))}
    </Stack>
  );
}

export default ProjectEnvirontmentPreview;
