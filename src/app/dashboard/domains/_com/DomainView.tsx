"use client";
import {
  Button,
  Card,
  Center,
  Paper,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { Editor } from "@monaco-editor/react";
import { Prisma } from "@prisma/client";
import {
  IconChevronRight,
  IconEdit,
  IconMoodEmpty,
  IconPlus,
} from "@tabler/icons-react";
import { useProxy } from "valtio/utils";
import yaml from "yaml";
import stateDomain from "../../_state/state-domain";
import { useState } from "react";

export default function DomainView() {
  const server = useProxy(stateDomain);
  const [select, setSelect] = useState<"muku" | "wibudev">("muku");

  useShallowEffect(() => {
    server.config.load();
  }, []);

  // if (!server.config.muku || !server.config.wibuDev) {
  //   return (
  //     <Stack>
  //       {Array.from({ length: 4 }).map((_, i) => (
  //         <Skeleton key={i} h={100} />
  //       ))}
  //     </Stack>
  //   );
  // }

  return (
    <Stack>
      <Button.Group>
        {["muku", "wibuDev"].map((domain) => (
          <Button
            key={domain}
            variant="light"
            color={select === domain ? "blue" : "grey"}
            rightSection={<IconChevronRight />}
            onClick={() => setSelect(domain as "muku" | "wibudev")}
          >
            {domain}
          </Button>
        ))}
      </Button.Group>
      {!server.config.muku || !server.config.wibuDev ? (
        <Loading />
      ) : (
        <ViewDetail
          config={
            select === "muku" ? server.config.muku! : server.config.wibuDev!
          }
        />
      )}
    </Stack>
  );
}

function Loading() {
  return (
    <Stack>
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} h={100} />
      ))}
    </Stack>
  );
}

function ViewDetail({ config }: { config: Prisma.DomainCreateInput }) {
  if (!config.domain_name)
    return (
      <Center>
        <Card withBorder p={"md"}>
          <Stack>
            <IconMoodEmpty size={"4rem"} />
            <Text>No domain</Text>
          </Stack>
        </Card>
      </Center>
    );
  return (
    <Paper withBorder p={"md"}>
      <Stack>
        <Text size="2rem" fw={"bold"}>
          {config.domain_name}
        </Text>
        <Button.Group>
          <Button variant="outline" color="grey" leftSection={<IconPlus />}>
            add
          </Button>
          <Button variant="outline" color="grey" leftSection={<IconEdit />}>
            edit
          </Button>
        </Button.Group>
        <Editor
          height={"460px"}
          value={yaml.stringify(config)}
          language="yaml"
          options={{
            readOnly: true,
            minimap: {
              enabled: false,
            },
          }}
          theme="vs-dark"
        />
      </Stack>
    </Paper>
  );
}
