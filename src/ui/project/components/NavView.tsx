import { Stack, Button } from "@mantine/core"
import { MdDownload, MdInstallDesktop, MdDataSaverOn, MdPlayCircle, MdDataset, MdBuild } from "react-icons/md"
import { ButtonStudio } from "./ButtonStudio"

export const NavView = ({ onPull, onInstall, onDbPush, onClean, onDbSeed, onBuild, onStart, data , title}:
    { onPull: () => void, onInstall: () => void, onDbPush: () => void, onClean: () => void, onDbSeed: () => void, onBuild: () => void, onStart: () => void, data: any, title: string }) => {

    return <Stack>
        <Button.Group>
            <Button onClick={onPull} leftSection={<MdDownload />} size="compact-xs" w={100}>pull</Button>
            <Button onClick={onInstall} leftSection={<MdInstallDesktop />} size="compact-xs" w={100}>install</Button>
            <Button disabled={data?.prisma === "false"} onClick={onDbPush} leftSection={<MdDataSaverOn />} size="compact-xs" w={100}>db push</Button>
            <Button disabled={data?.type === "none"} onClick={onClean} leftSection={<MdPlayCircle />} size="compact-xs" w={100}>clean</Button>
            <Button disabled={data?.seed === "false"} onClick={onDbSeed} leftSection={<MdDataset />} size="compact-xs" w={100}>db seed</Button>
            <Button disabled={data?.type !== "nextjs"} onClick={onBuild} leftSection={<MdBuild />} size="compact-xs" w={100}>build</Button>
            <Button disabled={data?.type === "none"} onClick={onStart} leftSection={<MdPlayCircle />} size="compact-xs" w={100}>start</Button>
            <ButtonStudio title={title} />
            {/* <Button disabled={data.prisma === "false"} onClick={onStudio} leftSection={<MdDataset />} size="compact-xs" w={100}>studio</Button> */}
        </Button.Group>
    </Stack>
}