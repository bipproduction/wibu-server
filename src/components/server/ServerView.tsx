import { Stack } from "@mantine/core";
import ServerViewMuku from "./ServerViewMuku";
import ServerViewWibuDev from "./ServerViewWibudev";
import { Title } from "@mantine/core";

function ServerView() {
    return (
      <Stack>
        <Title order={3}>Server</Title>
        <ServerViewMuku />
        <ServerViewWibuDev />
      </Stack>
    );
  }

  export default ServerView;