'use client'
import ConfigCreate from "@/components/config/ConfigCreate";
import ConfigList from "@/components/config/ConfigList";
import ConfigViewRun from "@/components/config/ConfigRun";
import ConfigViewDelete from "@/components/config/ConfigViewDelete";
import { useParams } from "next/navigation";

export default function Page() {
  const {slug} = useParams()
  if (slug == "list") {
    return <ConfigList />
  }
  if (slug == "run") {
    return <ConfigViewRun />;
  }
  if (slug == "delete") {
    return <ConfigViewDelete />;
  }
  if (slug == "create") {
    return <ConfigCreate />;
  }
  return <ConfigList />;
}
