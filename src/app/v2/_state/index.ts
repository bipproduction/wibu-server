import { proxy } from "valtio";
import v2ProjectState from "./project";
import V2GitState from "./git";

const v2State = proxy({
  project: v2ProjectState,
  git: V2GitState,
});

export default v2State;
