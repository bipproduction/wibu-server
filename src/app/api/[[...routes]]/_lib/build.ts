import { $ } from "execa";

async function build() {
  const { stdout } = await $`bun --version`;

  return {
    message: "Build completed",
    data: stdout,
  };
}

export default build;
