import path from "path"

const routePath = {
    api: {
        app: {
            listApp: {
                path: "/api/app/list-app",
                method: "GET",
                route: "src/app/api/app/list-app"
            },
            listProject: {
                path: "/api/app/list-project",
                method: "GET",
                route: "src/app/api/app/list-project"
            }
        },
        projectBoard: {
            create: {
                path: "/api/project-board/create",
                method: "POST",
                route: "src/app/api/project-board/create"
            },
            list: {
                path: "/api/project-board/list",
                method: "GET",
                route: "src/app/api/project-board/list"
            },
            byId: (id: string) => ({
                path: `/api/project-board/${id}`,
                method: "GET",
                route: "src/app/api/project-board/[id]"
            })
        },
    },
    bin: {
        studio: "/api/bin/project/studio",
    },
    page: {
        projectBoard: {
            byName: (name: string) => ({
                path: `/project-board/${name}`,
                route: "src/ui/project_board/page/ProjectBoardPage"
            }),
        }
    }
}

export default routePath