import configState from "@/state/config";
import {
  Button,
  Flex,
  Notification,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import ConfigDetail from "./ConfigDetail";

function ConfigList() {
  const etc = useSnapshot(configState);

  return (
    <Stack>
      <SimpleGrid cols={{
        base: 1,
        md: 2
      }}>
        <List />
        {etc.detail.text && <ConfigDetail />}
      </SimpleGrid>
    </Stack>
  );
}

function List() {
  const etc = useSnapshot(configState);

  useEffect(() => {
    configState.configList.load();
  }, []);

  return (
    <Stack bg={"dark.9"} p={"md"} flex={0}>
      <Text size={"1.5rem"}>Config List</Text>
      <Flex>
        <Notification
          onClose={() => (configState.notif = null)}
          title="Notification"
          display={etc.notif ? "block" : "none"}
        >
          {etc.notif}
        </Notification>
      </Flex>
      <Stack
        style={{
          width: "100%",
          overflow: "scroll",
        }}
      >
        <Stack gap={"xs"}>
          {etc.configList.list.map((item, index) => (
            <Flex key={index} gap={"md"} align={"center"}>
              <Text>{index + 1}</Text>
              <Text w={172}>{item.name}</Text>
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
