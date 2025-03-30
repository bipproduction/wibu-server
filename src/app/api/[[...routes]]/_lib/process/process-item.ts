import processGetList from "../process-get-list";

export async function processItem({ params }: { params: { name: string } }) {
  const list = await processGetList();
  const item = list.data.find((item) => item.name === params.name);
  return item;
}
