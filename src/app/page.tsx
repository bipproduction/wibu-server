/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import processState from "@/state/process";
import serverState from "@/state/server";
import { Button, Group, Stack, TextInput } from "@mantine/core";
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
      <Stack>
        <h3>Edit Server</h3>
        <Group>
          {muku.json.map((item, index) => (
            <Stack key={index}>
              <TextInput defaultValue={item.name} />
              <TextInput defaultValue={item.ports} />
            </Stack>
          ))}
        </Group>
        <div>
          <Button onClick={() => setIsEdit(false)}>Submit</Button>
        </div>
      </Stack>
    );
  }

  function Add() {
    return (
      <div className="card">
        <h3>Add New Server</h3>
        <div style={{ display: "flex", gap: "20px" }}>
          <TextInput placeholder="name" />
          <TextInput placeholder="ports" />
          <Button onClick={() => setIsAdd(false)}>Submit</Button>
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
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <div style={{ display: "flex", gap: "20px" }}>
        <Button disabled={isAdd} onClick={() => setIsEdit(!isEdit)}>
          {isEdit ? "Close" : "Edit"}
        </Button>
        <Button disabled={isEdit} onClick={() => setIsAdd(!isAdd)}>
          {isAdd ? "Close" : "Add"}
        </Button>
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
      <Button onClick={() => setIsEdit(!isEdit)}>
        {isEdit ? "Close" : "Edit"}
      </Button>
      {isEdit ? <Edit /> : <View />}
    </div>
  );
}
