import { Anchor, BackgroundImage, Flex, Stack, Text, Title } from "@mantine/core";


export default function Home() {
  return (
    <BackgroundImage src="/img/bg3.png" h={"100vh"} w={"100%"}>
      <Stack p={"md"}>
        <Flex  justify={"space-between"}>
          <Title order={4}>Wibu Server</Title>
          <Anchor href="/admin">Admin</Anchor>
        </Flex>
        <Text p={"lg"} bg={"dark"} c={"white"} maw={500} size={"lg"} style={{
          overflow: "auto"
        }}>
          黒崎一護（くろさき・いちご）は、日々の生活で普通の高校生として振る舞いながら、霊感が強く、霊界とつながる力を持っています。彼は突然死神の力を得て、霊魂の世界での戦いに巻き込まれます。そこで、彼は多くの仲間と出会います。

          最初に彼と出会うのは、朽木ルキア（くちき・るきあ）です。彼女は一護の霊力に注目し、彼に死神の力を授けることになります。彼女は強い意志と冷静な判断力を持ち、一護の旅における重要な指導者となります。

          一護の仲間の中には、織姫（おりひめ）や石田（いしだ）、そして日番谷（ひつがや）などがいます。彼らはそれぞれ独自の力と個性を持ち、一護の戦いを支えます。織姫は癒しの力を持ち、石田は優れた魔術師であり、日番谷は氷の力を操る強力な死神です。

          彼らの絆は、戦いの中でさらに強くなります。彼らは困難な状況に直面し、互いに助け合い、成長し続けます。彼らの友情は、時には笑い、時には涙を生み出し、彼らを共に強くし、彼らの目標に向かって前進させます。

          彼らは戦い、傷つき、勝利し、敗北しますが、常にお互いのそばにいて、共に成長し、強くなります。一護と彼の仲間たちの物語は、友情、勇気、そして成長の物語であり、彼らの絆は永遠に続きます。
        </Text>
      </Stack>

    </BackgroundImage>
  );
}
