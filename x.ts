function check(value: any) {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    typeof value.name === "string" &&
    typeof value.full_name === "string" &&
    typeof value.build === "boolean" &&
    typeof value.push === "boolean" &&
    typeof value.seed === "boolean" &&
    typeof value.projectEnvironment === "object" &&
    value.projectEnvironment !== null &&
    !Array.isArray(value.projectEnvironment) &&
    typeof value.projectEnvironment.name === "string" &&
    typeof value.projectEnvironment.branch === "string" &&
    typeof value.env === "object" &&
    value.env !== null &&
    !Array.isArray(value.env) &&
    Number.isFinite(value.instance) &&
    typeof value.reposId === "string" &&
    Object.getOwnPropertyNames(value).length === 9
  );
}

const data = {
  build: false,
  push: false,
  seed: false,
  name: "Baileys",
  full_name: "bipproduction/Baileys",
  projectEnvironment: {
    name: "",
    branch: "",
  },
  env: {},
  instance: null,
  reposId: "bipproduction/Baileys",
};

console.log(check(data));
