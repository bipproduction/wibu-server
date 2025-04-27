import { proxy } from "valtio";
import shaState from "./sha";
import branchState from "./branch";
import repoState from "./repo";

const V2GitState = proxy({
    repo: repoState,
    branch: branchState,
    sha: shaState,
  });
  
  export default V2GitState;