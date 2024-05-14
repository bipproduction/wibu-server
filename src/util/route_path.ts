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
            }),
            search: (name: string) => ({
                path: `/api/project-board/search?name=${name}`,
                route: "src/app/api/project-board/search",
                method: "GET"
            }),
            update: {
                path: "/api/project-board/update",
                method: "POST",
                route: "src/app/api/project-board/update"
            }
        },
    },
    bin: {
        studio: "/api/bin/project/studio",
        project: {
            gitLog: {
                path: "/api/bin/project/git-log",
                method: "POST",
                route: "src/app/api/bin/project/git-log"
            }
        }
    },
    page: {
        projectBoard: {
            byId: (id: string) => ({
                path: `/admin/project-board/${id}`,
                route: "src/app/admin/project-board/[id]",
            }),
        }
    }
}

export default routePath