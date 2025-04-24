import V2GitState from "@/app/v2/_state/git";
import { Group, Button } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { useProxy } from "valtio/utils";

const RepoSyncButton = () => {
  const gitSt = useProxy(V2GitState);
  return (
    <Group>
      <Button
        leftSection={<IconRefresh />}
        variant="light"
        loading={gitSt.repo.sync.loading}
        onClick={gitSt.repo.sync.submit}
      >
        Sync Repo
      </Button>
    </Group>
  );
};

export default RepoSyncButton;
