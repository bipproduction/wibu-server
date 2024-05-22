'use client'
import { TableProject } from "./components/TableProject"

export function PageProject({ list }: { list: any[] }) {
    return <>
        <TableProject list={list} />
    </>
}