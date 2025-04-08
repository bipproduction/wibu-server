"use client";
import {
  Paper,
  Skeleton,
  Stack,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import {
  useDebouncedCallback,
  useShallowEffect
} from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useProxy } from "valtio/utils";
import stateGithub from "../../_state/state-github";

export function ReposView() {
  const github = useProxy(stateGithub);
  useShallowEffect(() => {
    if (!github.repos.list.data) {
      github.repos.list.load();
    }
  }, []);

  return (
    <Paper p={"md"} withBorder>
      <Stack>
        <Search />
        {github.repos.list.data ? <View /> : <Loading />}
      </Stack>
    </Paper>
  );
}

function Loading() {
  return Array.from({ length: 5 }).map((_, i) => (
    <Skeleton key={i} height={40} />
  ));
}

function View() {
  const github = useProxy(stateGithub);
  return (
    <Stack>
      {github.repos.list.data?.map((repo) => (
        <UnstyledButton
          c={github.repos.selected?.id === repo.id ? "blue.5" : "grey"}
          onClick={() => {
            if (github.repos.selected && github.repos.selected.id === repo.id) {
              github.repos.selected = null;
            } else {
              github.repos.selected = repo;
            }
          }}
          key={repo.id}
        >
          {repo.name}
        </UnstyledButton>
      ))}
    </Stack>
  );
}

function Search() {
  const github = useProxy(stateGithub);
  const handleSearch = useDebouncedCallback(async (query: string) => {
    if (query.length < 1) {
      github.repos.list.load();
      return;
    }
    github.repos.list.search(query);
  }, 300);
  return (
    <TextInput
      placeholder="Search..."
      leftSection={<IconSearch />}
      onChange={async (v) => {
        handleSearch(v.target.value);
      }}
    />
  );
}
