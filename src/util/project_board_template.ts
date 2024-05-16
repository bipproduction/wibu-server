import { v4 as uuidv4 } from 'uuid';

interface ModelColumn {
    id: string;
    title: string;
    display: boolean;
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
    history: []
}

interface Item {
    id: string; // UUID
    title: string;
    description: string;
    assigned: any[]; // Ganti any[] dengan tipe data yang sesuai untuk assigned
}

export const listColumn = [
    {
        id: "backlog",
        title: "Backlog",
        display: true,
        items: []
    },
    {
        id: "todo",
        title: "To Do",
        display: true,
        items: []
    },
    {
        id: "inprogress",
        title: "In Progress",
        display: true,
        items: []

    },
    {
        id: "review",
        title: "Review",
        display: false,
        items: []
    },
    {
        id: "done",
        title: "Done",
        display: false,
        items: []
    },
    {
        id: "onhold",
        title: "On Hold",
        display: false,
        items: []
    },
    {
        id: "trash",
        title: "Trash",
        display: false,
        items: []
    },
    {
        id: "archive",
        title: "Archive",
        display: false,
        items: []
    },
    {
        id: "extend",
        title: "Extend",
        display: false,
        items: []
    }
]

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
            history: [],
            columns: listColumn
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
