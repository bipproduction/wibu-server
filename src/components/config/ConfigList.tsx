'use client'
import configState from "@/state/config";
import { Button, Flex, Grid, Stack, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import ConfigDetail from "./ConfigDetail";

function ConfigList() {
  const etc = useSnapshot(configState);

  return (
    <Stack>
      <Grid>
        <Grid.Col span={"content"}>
          <List />
        </Grid.Col>
        <Grid.Col span={"auto"}>{etc.detail.text && <ConfigDetail name={etc.detail.name!} />}</Grid.Col>
      </Grid>
    </Stack>
  );
}

function List() {
  const config = useSnapshot(configState);

  useEffect(() => {
    configState.configList.load();
  }, []);

  return (
    <Stack bg={"dark.9"} p={"md"} flex={0}>
      <Text size={"1.5rem"}>Config List</Text>
      <Stack
        style={{
          width: "100%",
          overflow: "scroll",
        }}
      >
        <Stack gap={"xs"}>
          {config.configList.list.map((item, index) => (
            <Flex
              key={index}
              gap={"md"}
              align={"center"}
              bg={item.name === config.detail.name ? "dark.8" : "dark.9"}
            >
              <Text>{index + 1}</Text>
              <Text >{item.name}</Text>
              <Button
                variant="transparent"
                onClick={() => configState.detail.load({ name: item.name })}
              >
                <IconChevronRight />
              </Button>
            </Flex>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ConfigList;
