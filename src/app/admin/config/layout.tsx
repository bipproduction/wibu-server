"use client";
import { Stack } from "@mantine/core";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // <Grid>
    //   <Grid.Col
    //     span={{
    //       base: 12,
    //       md: 3,
    //     }}
    //   >
    //     <List />
    //   </Grid.Col>
    //   <Grid.Col
    //     span={{
    //       base: 12,
    //       md: 9,
    //     }}
    //   >
    //     {children}
    //   </Grid.Col>
    // </Grid>
    <Stack>{children}</Stack>
  );
}

// function List() {
//   const { config: configName } = useParams();
//   const config = useProxy(configState);

//   useShallowEffect(() => {
//     configState.configList.load();
//   }, []);
//   return (
//     <Stack bg={"dark.9"} p={"md"} flex={0}>
//       <Flex gap={"md"} align={"center"} justify={"space-between"}>
//         <Text size={"1.5rem"}>Config List</Text>
//         <ActionIcon
//           variant="transparent"
//           component={Link}
//           href={"/admin/config/create"}
//         >
//           <IconPlus />
//         </ActionIcon>
//       </Flex>

//       <Stack
//         style={{
//           width: "100%",
//           overflow: "scroll",
//         }}
//       >
//         <Stack gap={"xs"}>
//           {config.configList.list.map((item, index) => (
//             <Flex
//               key={index}
//               gap={"md"}
//               align={"center"}
//               justify={"space-between"}
//               bg={item.name === configName?.[0] ? "dark" : "dark.9"}
//             >
//               <Flex gap={"md"} align={"center"}>
//                 <Badge bg={"gray"}><Text>{index + 1}</Text></Badge>
//                 <Text>{item.name}</Text>
//               </Flex>
//               <Button
//                 variant="transparent"
//                 component={Link}
//                 href={`/admin/config/${item.name}`}
//               >
//                 <IconChevronRight />
//               </Button>
//             </Flex>
//           ))}
//         </Stack>
//       </Stack>
//     </Stack>
//   );
// }
