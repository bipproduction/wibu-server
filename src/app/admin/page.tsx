"use client";
import { Card, Flex, Stack, Text } from "@mantine/core";

export default function Page() {
  return (
    <Stack>
      <Card>
        <Flex gap={"md"} align={"center"}>
          <Text size="1.5rem">Admin</Text>
        </Flex>
      </Card>
      <div
        style={{ position: "relative", width: "100%", aspectRatio: "16 / 9" }}
      >
        <iframe
          id="mediaplayer"
          src="https://ww1.anoboy.app/uploads/adsbatch720.php?url=AD6v5dwWdF_bbNhJNGO8fWpTSqfZznJf3Y_u2PI9X8M21CDFCsF99d4pdeFEpAAI5kEbp-l8KfbPHgRtT3UV1-U3BKlDnI7Ns6VRngBlVZsGR5jYNL7TG1Xb_NDrx_kq4Xs0JJGd_g"
          title="noboy"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
          allowFullScreen
        ></iframe>
      </div>
    </Stack>
  );
}
