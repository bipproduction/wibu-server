import serverState from "@/state/server";
import { Button } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { useSnapshot } from "valtio";

function ServerViewWibuDev() {
    const { wibudev } = useSnapshot(serverState);
    const [isEdit, setIsEdit] = useState(false);
    useShallowEffect(() => {
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
        <Button variant="light" onClick={() => setIsEdit(!isEdit)}>
          {isEdit ? "Close" : "Edit"}
        </Button>
        {isEdit ? <Edit /> : <View />}
      </div>
    );
  }

  export default ServerViewWibuDev;