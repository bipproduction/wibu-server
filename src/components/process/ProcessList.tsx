import processState from "@/state/process";
import { Stack, Title, Table, Text, Tooltip } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useSnapshot } from "valtio";

function ProcessList() {
  const process = useSnapshot(processState);
  useShallowEffect(() => {
    process.load();
  }, []);
  return (
    <Stack bg={"dark.9"} p={"md"}>
      <Title order={3}>Process List</Title>
      <div
        style={{
          width: "100%",
          overflow: "scroll",
        }}
      >
        <Table>
          <Table.Thead>
            <Table.Tr bg={"gray.9"}>
              {_.keys(process.list[0]).map((key) => (
                <Table.Th key={key}>
                  <Text>{key}</Text>
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {process.list.map((item, index) => (
              <Table.Tr key={index}>
                {_.keys(item).map((key) => (
                  <Table.Td key={key} maw={230}>
                    <Tooltip label={item[key]}>
                      <Text
                        lineClamp={1}
                        c={
                          key === "status" && item[key] === "online"
                            ? "green"
                            : ""
                        }
                      >
                        {item[key] ?? "-"}
                      </Text>
                    </Tooltip>
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </Stack>
  );
}

export default ProcessList;
