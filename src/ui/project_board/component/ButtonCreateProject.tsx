
import routePath from "@/util/route_path";
import { ModelProject, boardTemplate } from "@/util/project_board_template";
import tos from "@/util/tos";
import { Button, Group, Loader, Modal, Portal, Select, Stack, TextInput } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import moment from "moment";
import { useState } from "react";
import { revalidatePath } from "next/cache";
import { MdAdd } from "react-icons/md";

export function ButtonCreateProject({onSuccess}: {onSuccess: () => void}) {
    const [openModal, setOpenModal] = useState(false);
    const [listProject, setlistProject] = useState<any[] | null>(null)

    const [loadingCreate, setLoadingCreate] = useState(false)
    const [projectForm, setProjectForm] = useState<ModelProject>({
        title: "",
        description: "",
        parentProject: "",
        initiatedAt: "",
        conclusionAt: ""

    })

    useShallowEffect(() => {
        loadListProject()
    }, [])

    const loadListProject = async () => {
        const res = await fetch(routePath.api.app.listProject.path, { cache: "no-store", method: routePath.api.app.listProject.method }).then(res => res.json())
        setlistProject(res)
    }



    const onCreate = async () => {
        // ? setLoading
        setLoadingCreate(true)

        const template = boardTemplate.project({
            title: projectForm.title,
            description: projectForm.description,
            parentProject: projectForm.parentProject,
            initiatedAt: new Date(projectForm.initiatedAt).toISOString(),
            conclusionAt: new Date(projectForm.conclusionAt).toISOString()
        })


        // ? check jika template ada yang kosong
        if (template.title == "" || template.description == "" || template.initiatedAt == "" || template.conclusionAt == "") {
            tos("title, description, initiatedAt and conclusionAt is required", "warning")
            return
        }

        const res = await fetch(routePath.api.projectBoard.create.path, {
            method: routePath.api.projectBoard.create.method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(template)
        })

        if (res.ok) {
            await loadListProject()
            setOpenModal(false)
            setLoadingCreate(false)
            tos("create project success", "success")
            onSuccess()
        }
    }

    return <Stack>
        <Group>
            <Button size="compact-xs" leftSection={<MdAdd />} onClick={() => setOpenModal(true)}>Create Projct</Button>
        </Group>
        <Portal>
            <Modal title={"CREATE NEW"} opened={openModal} onClose={() => setOpenModal(false)} >
                <Stack>
                    <Select onChange={(e) => setProjectForm({ ...projectForm, parentProject: e ?? "" })} disabled={!listProject} leftSection={!listProject && <Loader size={24} />} placeholder="Select project" label={"main project"} data={listProject?.map((item) => ({ value: item.name, label: item.name }))} />
                    <TextInput onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} label={"title"} placeholder="title" />
                    <TextInput onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} label={"description"} placeholder="description" />
                    <TextInput onChange={(e) => setProjectForm({ ...projectForm, initiatedAt: e.target.value })} type="date" label={"Initiated"} placeholder="Initiated" />
                    <TextInput onChange={(e) => setProjectForm({ ...projectForm, conclusionAt: e.target.value })} type="date" label={"conclusion at"} placeholder="conclusion at" />
                    <Group gap={"lg"} justify="end">
                        <Button onClick={onCreate}>Create</Button>
                        <Button bg={"red"} onClick={() => setOpenModal(false)}>Cancel</Button>
                    </Group>
                </Stack>
            </Modal>
        </Portal>
    </Stack>
}