// import { evnDev } from "@/util/event"
// import { evnDev } from "@/util/event"
import { ActionIcon, Anchor, Avatar, Box, Group, Menu, Popover } from "@mantine/core"
import { useHover, useLocalStorage, useShallowEffect } from "@mantine/hooks"
import _ from "lodash"
import { MdOpenInNew } from "react-icons/md"



export function DevUi_dep({ children, pathString = "" }: { children: React.ReactNode, pathString?: string }) {
    const { hovered, ref } = useHover()
    const [isDev, setIsdev] = useLocalStorage({
        key: "isDev",
        defaultValue: false,
        getInitialValueInEffect: true
    })

    useShallowEffect(() => {
       
    }, [])

    return <Box style={{
        border: (isDev && hovered) ? "0.5px solid red" : "",
    }}
        ref={ref}
        pos={"relative"}
    >
        <Anchor pos={"absolute"} right={0} display={!isDev || !hovered && !_.isEmpty(pathString) ? "none" : "block"} href={pathString} style={{
            zIndex: 99
        }} variant="light">
            <ActionIcon>
                <MdOpenInNew />
            </ActionIcon>
        </Anchor>

        {children}
    </Box>
}