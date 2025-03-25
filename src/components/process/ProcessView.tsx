import processState from "@/state/process";
import { useShallowEffect } from "@mantine/hooks";
import { useSnapshot } from "valtio";

function ProcessView() {
    const process = useSnapshot(processState);
    useShallowEffect(() => {
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

  export default ProcessView;