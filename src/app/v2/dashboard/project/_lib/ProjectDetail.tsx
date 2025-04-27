import V2Router from "@/app/v2/_router";
import v2ProjectState from "@/app/v2/_state/project";
import { Checkbox, Group, Paper, Skeleton, Stack, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useProxy } from "valtio/utils";

const ProjectDetail = () => {
  const { projectId } =
    V2Router.routes.dashboard.project.parse(useSearchParams());
  const projectProxy = useProxy(v2ProjectState);

  useShallowEffect(() => {
    if (!projectId) return;
    projectProxy.findUniq.load(projectId);
  }, [projectId]);

  if (!projectProxy.findUniq.data) {
    return (
      <Stack>
        {Array.from({ length: 5 }).map((v, k) => (
          <Skeleton key={k} h={40} />
        ))}
      </Stack>
    );
  }

  return (
    <Stack>
      <Paper p={"md"} withBorder>
        <Stack>
          <Stack gap={0}>
            <Text fw={"bold"} size="2rem">
              {projectProxy.findUniq.data.name}
            </Text>
            <Text fw={"lighter"}>
              {projectProxy.findUniq.data.repos?.html_url}
            </Text>
          </Stack>
          <Group gap={"md"}>
            <Checkbox
              variant="outline"
              color="white"
              label="Build"
              checked={projectProxy.findUniq.data.build}
              readOnly
            />
            <Checkbox
              variant="outline"
              color="white"
              label="Push"
              checked={projectProxy.findUniq.data.push}
              readOnly
            />
            <Checkbox
              variant="outline"
              color="white"
              label="Seed"
              checked={projectProxy.findUniq.data.seed}
              readOnly
            />
          </Group>
        </Stack>
      </Paper>
      <ProjectEnvironment />
    </Stack>
  );
};

const ProjectEnvironment = () => {
  const projectProxy = useProxy(v2ProjectState);
  const { projectId } =
    V2Router.routes.dashboard.project.parse(useSearchParams());

  useShallowEffect(() => {
    if (!projectId) return;
    projectProxy.environment.findMany.load({
      projectId,
    });
  }, []);

  const Loading = () => {
    return (
      <Stack>
        {Array.from({ length: 5 }).map((v, k) => (
          <Skeleton key={k} h={40} />
        ))}
      </Stack>
    );
  };

  const ListView = () => {
    if (projectProxy.environment.findMany.loading) return <Loading />;
    return (
      <Stack>
        {projectProxy.environment.findMany.data?.map((env) => (
          <Paper
            c={"white"}
            key={env.id}
            withBorder
            p={"md"}
            component={Link}
            href={V2Router.routes.dashboard.project.environment.query({
              environmentId: env.id,
              action: "no-action",
              projectId,
            })}
          >
            <Stack>
              <Text fw={"bold"}>{env.name}</Text>
              <Text fw={"lighter"}>{env.branch}</Text>
            </Stack>
          </Paper>
        ))}
      </Stack>
    );
  };

  return (
    <Paper p={"md"} withBorder>
      <Stack>
        <Text size="1.5rem" fw={"bold"}>
          Environment
        </Text>
        <ListView />
      </Stack>
    </Paper>
  );
};

// const EnvironmentDetail = () => {
//   const { projectId, environmentId } =
//     V2Router.routes.dashboard.project.parse(useSearchParams());
//   const projectProxy = useProxy(v2ProjectState);

//   useShallowEffect(() => {
//     if (!environmentId) return;
//     projectProxy.environment.findUnique.load({
//       environmentId,
//     });
//   }, []);

//   if (!projectProxy.environment.findUnique.data) {
//     return (
//       <Stack>
//         {Array.from({ length: 5 }).map((v, k) => (
//           <Skeleton key={k} h={40} />
//         ))}
//       </Stack>
//     );
//   }
//   return (
//     <Stack>
//       <Group>
//         <ActionIcon
//           variant="light"
//           component={Link}
//           href={V2Router.routes.dashboard.project.query({
//             projectId,
//             action: "detail",
//           })}
//         >
//           <IconChevronLeft />
//         </ActionIcon>
//         <Text size="1.5rem">Environment Detail</Text>
//       </Group>
//       <Paper
//         p={"md"}
//         withBorder
//         component={Link}
//         href={V2Router.routes.dashboard.project.environment.query({
//           environmentId,
//           action: "no-action",
//         })}
//       >
//         <Stack>
//           <Text fw={"bold"}>
//             {projectProxy.environment.findUnique.data.name}
//           </Text>
//           <Text fw={"lighter"}>
//             {projectProxy.environment.findUnique.data.branch}
//           </Text>
//         </Stack>
//       </Paper>
//       {/* <ConfigView /> */}
//     </Stack>
//   );
// };

// const ConfigView = () => {
//   const projectProxy = useProxy(v2ProjectState);
//   const { environmentId } =
//     V2Router.routes.dashboard.project.parse(useSearchParams());

//   useShallowEffect(() => {
//     if (!environmentId) return;
//     projectProxy.config.findUnique.load({
//       projectEnvironmentId: environmentId,
//     });
//   }, []);

//   const Loading = () => {
//     return (
//       <Stack>
//         {Array.from({ length: 5 }).map((v, k) => (
//           <Skeleton key={k} h={40} />
//         ))}
//       </Stack>
//     );
//   };

//   if (!projectProxy.environment.findUnique.data) return <Loading />;
//   return (
//     <Paper p={"md"} withBorder>
//       <Stack>
//         <Text size="1.5rem" fw={"bold"}>
//           Config
//         </Text>
//         <Stack>
//           {projectProxy.config.findUnique.data?.map((v, k) => (
//             <Paper key={k} p={"md"} withBorder>
//               <Stack>
//                 <Text fw={"bold"}>{v.name}</Text>
//                 <Text fw={"lighter"}>{v.namespace}</Text>
//               </Stack>
//             </Paper>
//           ))}
//         </Stack>
//       </Stack>
//     </Paper>
//   );
// };

export default ProjectDetail;
