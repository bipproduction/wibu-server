import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useProxy } from "valtio/utils";
import stateProject from "../../_state/state-project";

export function ProjectSearch() {
  const projectState = useProxy(stateProject);
  return (
    <TextInput
      onChange={(e) => {
        if (e.target.value === "") {
          projectState.list.load();
          return;
        }
        projectState.list.search(e.target.value);
      }}
      placeholder="Search projects"
      leftSection={<IconSearch />}
      w={"100%"}
    />
  );
}
