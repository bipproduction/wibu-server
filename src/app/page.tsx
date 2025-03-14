/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import processState from "@/state/process";
import serverState from "@/state/server";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexDirection: "column",
      }}
    >
      <h1>API Server</h1>
      <ServerView />
      <ProcessView />
    </div>
  );
}

function ProcessView() {
  const process = useSnapshot(processState);
  useEffect(() => {
    process.load();
  }, []);
  return (
    <div>
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

function ServerView() {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexDirection: "column",
      }}
    >
      <ServerViewMuku />
      <ServerViewWibuDev />
    </div>
  );
}

function ServerViewMuku() {
  const { muku } = useSnapshot(serverState);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  useEffect(() => {
    muku.load();
  }, []);

  function Edit() {
    return (
      <div className="card">
        <h3>Edit Server</h3>
        {muku.json.map((item, index) => (
          <div key={index}>
            <input type="text" defaultValue={item.name} />
            <input type="text" defaultValue={item.ports} />
          </div>
        ))}
        <div>
        <button onClick={() => setIsEdit(false)}>Submit</button>
        </div>
      </div>
    );
  }

  function Add() {
    return (
      <div className="card">
        <h3>Add New Server</h3>
        <div style={{ display: "flex", gap: "20px" }}>
          <input placeholder="name" type="text" />
          <input placeholder="ports" type="text" />
          <button onClick={() => setIsAdd(false)}>Submit</button>
        </div>
        
      </div>
    );
  }

  function View() {
    return (
      <div>
        <code>
          <pre>{muku.table}</pre>
        </code>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: "20px", flexDirection: "column", padding: "20px" }}>
      <div style={{ display: "flex", gap: "20px" }}>
        <button disabled={isAdd} onClick={() => setIsEdit(!isEdit)}>
          {isEdit ? "Close" : "Edit"}
        </button>
        <button disabled={isEdit} onClick={() => setIsAdd(!isAdd)}>
          {isAdd ? "Close" : "Add"}
        </button>
      </div>
      <div>
        {isEdit ? <Edit /> : <View />}
        {isAdd && <Add />}
      </div>
    </div>
  );
}

function ServerViewWibuDev() {
  const { wibudev } = useSnapshot(serverState);
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    wibudev.load();
  }, []);

  function Edit() {
    return <div>{JSON.stringify(wibudev.json)}</div>;
  }

  function View() {
    return (
      <div>
        <code>
          <pre>{wibudev.table}</pre>
        </code>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => setIsEdit(!isEdit)}>
        {isEdit ? "Close" : "Edit"}
      </button>
      {isEdit ? <Edit /> : <View />}
    </div>
  );
}
