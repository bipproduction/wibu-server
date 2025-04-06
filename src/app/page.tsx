/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import utilState from "@/state/util";
import {
  BackgroundImage,
  Button,
  Container,
  Flex,
  Paper,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Title
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import Link from "next/link";
import { useProxy } from "valtio/utils";

export default function Home() {
  const utils = useProxy(utilState);
  useShallowEffect(() => {
    if (!utils.anime.list) {
      utils.anime.load();
    }
  }, []);
  return (
    <Stack>
      <Flex
        p={"sm"}
        justify={"space-between"}
        align={"center"}
        bg={"dark.9"}
        pos={"sticky"}
        top={0}
      >
        <Title order={2}>Wibu Server</Title>
        <Button variant="transparent" component={Link} href="/admin">
          Admin
        </Button>
      </Flex>
      <Container
        fluid
        w={{
          base: "100%",
          sm: "70%",
        }}
      >
        {!utils.anime.list && <Loading />}
        {utils.anime.list && <AnimeView list={utils.anime.list} />}
      </Container>
    </Stack>
  );
}

function AnimeView({ list }: { list: any[] }) {
  return (
    <SimpleGrid
      cols={{
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
      }}
    >
      {list.map((item, i) => {
        return (
          <Paper key={i} withBorder>
            <BackgroundImage h={170} key={i} src={item.img}>
              <Stack h={"100%"} justify="end">
                <Text
                  fw={"bold"}
                  c={"white"}
                  style={{
                    padding: "5px",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                  lineClamp={2}
                >
                  {item.title}
                </Text>
              </Stack>
            </BackgroundImage>
          </Paper>
        );
      })}
    </SimpleGrid>
  );
}

function Loading() {
  return (
    <SimpleGrid
      cols={{
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
      }}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} h={150} />
      ))}
    </SimpleGrid>
  );
}
