import { NodeResizer } from "@reactflow/node-resizer";
import "@reactflow/node-resizer/dist/style.css";
import { CSSProperties, memo } from "react";
import { Handle, Position, ReactFlowState, useStore } from "reactflow";

const connectionNodeIdSelector = (state: ReactFlowState) => {
  return state.connectionNodeId;
};

export default memo(({ data, selected }: any) => {
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const style: CSSProperties = {
    visibility: selected || connectionNodeId ? "visible" : "hidden",
  };

  return (
    <>
      <NodeResizer
        color="var(--primary-color)"
        isVisible={selected}
        minWidth={100}
        minHeight={30}
      />
      {data.label}

      <Handle type="source" position={Position.Top} id="a" style={style} />
      <Handle type="source" position={Position.Right} id="b" style={style} />
      <Handle type="source" position={Position.Bottom} id="c" style={style} />
      <Handle type="source" position={Position.Left} id="d" style={style} />
    </>
  );
});
