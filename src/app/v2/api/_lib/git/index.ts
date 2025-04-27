import Elysia from "elysia";
import ApiBranch from "./branch";
import ApiRepo from "./repo";
import ApiSha from "./sha";

const ApiGit = new Elysia({
  prefix: "/git",
})
  .use(ApiRepo)
  .use(ApiBranch)
  .use(ApiSha);

export default ApiGit;
