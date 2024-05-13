import { v4 as uuidv4 } from 'uuid';

interface ModelColumn {
    id: string;
    title: string;
    items: any[]; // Ganti any[] dengan tipe data yang sesuai untuk item-item
}

export interface ModelProject {
    title: string;
    parentProject: string;
    description: string;
    initiatedAt: string;
    conclusionAt: string;
}

interface ModelItem {
    title: string;
    description: string;
    assigned: any[]; // Ganti any[] dengan tipe data yang sesuai untuk assigned
}

interface ModelBoardTemplate {
    project: (data: ModelProject) => Project;
    item: (data: ModelItem) => Item;
}

export interface Project {
    id?: string; // UUID
    title: string;
    parentProject?: string;
    status: "active";
    description: string;
    createdAt?: string; // Tanggal dalam format ISO string
    updatedAt?: string;
    initiatedAt: string; // Tanggal dalam format ISO string
    conclusionAt: string; // Tanggal dalam format ISO string, opsional
    columns: ModelColumn[];
    isActive?: boolean;
}

interface Item {
    id: string; // UUID
    title: string;
    description: string;
    assigned: any[]; // Ganti any[] dengan tipe data yang sesuai untuk assigned
}

export const boardTemplate: ModelBoardTemplate = {
    project: ({ title, parentProject, description, initiatedAt, conclusionAt }: ModelProject) => {
        return {
            title: title,
            parentProject: parentProject,
            status: "active",
            description: description,
            isActive: true,
            initiatedAt: initiatedAt,
            conclusionAt: conclusionAt,
            columns: [
                {
                    id: "backlog",
                    title: "Backlog",
                    items: []
                },
                {
                    id: "todo",
                    title: "To Do",
                    items: []
                },
                {
                    id: "inprogress",
                    title: "In Progress",
                    items: []
                },
                {
                    id: "review",
                    title: "Review",
                    items: []
                },
                {
                    id: "done",
                    title: "Done",
                    items: []
                },
                {
                    id: "onhold",
                    title: "On Hold",
                    items: []
                },
                {
                    id: "trash",
                    title: "Trash",
                    items: []
                },
                {
                    id: "archive",
                    title: "Archive",
                    items: []
                }
            ]
        };
    },
    item: ({ title, description, assigned }: ModelItem) => {
        return {
            id: uuidv4(),
            title: title,
            description: description,
            assigned: assigned,
        };
    }
};
