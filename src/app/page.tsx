"use client";
import processState from "@/state/process";
import serverState from "@/state/server";
import { useEffect } from "react";
import { useSnapshot } from "valtio";

export default function Home() {
  const { wibudev, muku } = useSnapshot(serverState);
  const process = useSnapshot(processState);

  useEffect(() => {
    wibudev.load();
    muku.load();
    process.load();
  }, []); // Removed wibudev from dependencies

  return (
    <div className="p-4">
      <h1>API Server</h1>
      <code>
        <pre>{muku.table}</pre>
      </code>
      <code>
        <pre>{wibudev.table}</pre>
      </code>
      <div
        style={{
          width: "100%",
          overflow: "scroll",
        }}
      >
        <code>
          <pre>{process.table}</pre>
        </code>
      </div>
    </div>
  );
}
