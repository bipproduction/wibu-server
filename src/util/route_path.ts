import app_config from "./app_config"

const routePath = {
    api: {
        app: {
            listApp: {
                path: "/api/app/list-app",
                method: "GET",
                route: "src/app/api/app/list-app",
                server() {
                    this.path = app_config.host + "/api/app/list-app"
                    return this
                },
                async data() {
                    return fetch(routePath.api.app.listApp.path, { method: routePath.api.app.listApp.method, cache: 'no-store' }).then(res => res.json())
                }
            },
            listProject: {
                path: "/api/app/list-project",
                method: "GET",
                route: "src/app/api/app/list-project",
                server() {
                    this.path = app_config.host + "/api/app/list-project"
                    return this
                },
                async data() {
                    return fetch(routePath.api.app.listProject.path, { method: routePath.api.app.listProject.method, cache: 'no-store' }).then(res => res.json())
                }
            },
            listServer: {
                path: "/api/app/list-server",
                method: "GET",
                route: "src/app/api/app/list-server",
                server() {
                    this.path = app_config.host + "/api/app/list-server"
                    return this
                },
                async data() {
                    return fetch(routePath.api.app.listServer.path, { method: routePath.api.app.listServer.method, cache: 'no-store' }).then(res => res.json())
                }
            },

        },
        projectBoard: {
            create: {
                path: "/api/project-board/create",
                method: "POST",
                route: "src/app/api/project-board/create",
                async data(body: string) {
                    return fetch(routePath.api.projectBoard.create.path, { method: routePath.api.projectBoard.create.method, cache: 'no-store', body }).then(res => res.json())
                }
            },
            list: {
                path: "/api/project-board/list",
                method: "GET",
                route: "src/app/api/project-board/list",
                server() {
                    this.path = app_config.host + "/api/project-board/list"
                    return this
                },
                async data() {
                    return fetch(routePath.api.projectBoard.list.path, { method: routePath.api.projectBoard.list.method, cache: 'no-store' }).then(res => res.json())
                }
            },
            byId: (id: string) => ({
                path: `/api/project-board/${id}`,
                method: "GET",
                route: "src/app/api/project-board/[id]",
                async data(id: string) {
                    return fetch(routePath.api.projectBoard.byId(id).path, { method: routePath.api.projectBoard.byId(id).method, cache: 'no-store' }).then(res => res.json())
                }
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
            },
            delete: {
                path: "/api/project-board/delete",
                method: "POST",
                route: "src/app/api/project-board/delete"
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
            },
            clean: {
                path: "/api/bin/project/clean",
                method: "POST",
                route: "src/app/api/bin/project/clean",
                server() {
                    this.path = app_config.host + "/api/bin/list-project/clean"
                    return this
                },
                async data({ body }: { body: string }) {
                    return fetch(this.path, { method: this.method, body }).then(res => res.json())
                }
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