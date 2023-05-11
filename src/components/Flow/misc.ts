import { MarkerType } from "reactflow";
import CustomNode from "../CustomNode/CustomNode";

export const nodeTypes = {
  custom: CustomNode,
};

export const initialNodes = [
  {
    id: "1",
    label: "1",
    position: { x: 0, y: 0 },
    data: { label: "drag me around 😎" },
    type: "custom",
  },
  {
    id: "2",
    label: "2",
    position: { x: 0, y: 150 },
    data: { label: "...or me" },
    type: "custom",
  },
];

export const initialEdges = [
  {
    id: "1-2",
    source: "1",
    target: "2",
    sourceHandle: "c",
    targetHandle: "a",
    type: "default",
    markerEnd: { type: MarkerType.ArrowClosed },
    label: "label only edge",
    style: { stroke: "#000000" },
  },
];

export const fitViewOptions = { padding: 4 };
let id = 0;
export const getId = () => `dndnode_${id++}`;
