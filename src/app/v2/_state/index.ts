import { proxy } from "valtio";
import v2ProjectState from "./project";

const v2State = proxy({
  project: v2ProjectState,
});

export default v2State;
