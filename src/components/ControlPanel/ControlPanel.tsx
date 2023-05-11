import { FC } from "react";
import { Panel } from "reactflow";
import "./controlPanel.css";
export const ControlPanel: FC<any> = ({ addNode, clearNodes }) => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Panel className="controlPanel" position="top-left" onClick={addNode}>
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "custom")}
        draggable
      >
        <span className="icon icon-ic_campos_adicionales" />
      </div>
      <div onClick={clearNodes}>
        <span className="icon icon-ic_trash" />
      </div>
    </Panel>
  );
};
