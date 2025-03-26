import serverState from "@/state/server";
import { Button, Flex, Group, Stack, Text, TextInput, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { useSnapshot } from "valtio";

function ServerViewMuku() {
    const { muku } = useSnapshot(serverState);
    const [isEdit, setIsEdit] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    useShallowEffect(() => {
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
            <Button variant="light" onClick={() => setIsEdit(false)}>
              Submit
            </Button>
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
            <Button variant="light" onClick={() => setIsAdd(false)}>
              Submit
            </Button>
          </div>
        </div>
      );
    }
  
    function View() {
      return (
       <Stack>
        <Stack gap={0}>
            {muku.json.map((item, index) => (
              <Flex key={index} gap={"md"}>
                <Text>{index + 1}</Text>
                <Text w={"460"}>{item.name}</Text>
                <Text>{item.ports.join(", ")}</Text>
              </Flex>
            ))}
          </Stack>
       </Stack>
      );
    }
  
    return (
      <Stack>
        <Title order={3}>Muku</Title>
        <Group>
          <Button
            variant="light"
            disabled={isAdd}
            onClick={() => setIsEdit(!isEdit)}
          >
            {isEdit ? "Close" : "Edit"}
          </Button>
          <Button
            variant="light"
            disabled={isEdit}
            onClick={() => setIsAdd(!isAdd)}
          >
            {isAdd ? "Close" : "Add"}
          </Button>
        </Group>
        <Stack>
          {isEdit ? <Edit /> : <View />}
          {isAdd && <Add />}
        </Stack>
      </Stack>
    );
  }

  export default ServerViewMuku;