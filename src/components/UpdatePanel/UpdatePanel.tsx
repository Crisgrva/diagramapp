import { Button, Checkbox } from "@aranda/aranda.ui";
import { FC, useEffect, useState } from "react";
import { Panel } from "reactflow";
import "./styles.css";

export const UpdatePanel: FC<any> = ({
  currentNode,
  setCurrentNode,
  onSubmit,
  deleteNode,
  currentEdge,
  setCurrentEdge,
  updateEdge,
  onSubmitEdge,
}) => {
  const [nodeName, setNodeName] = useState<string>("");
  const [edgeName, setEdgeName] = useState<string>("");

  const [expanded, setExpanded] = useState(true);
  const [isAnimated, setIsAnimated] = useState(false);

  const handleOnChange = (evt: any) => {
    setNodeName(evt.target.value);
  };

  const handleOnChangeEdgeName = (evt: any) => {
    setEdgeName(evt.target.value);
  };

  const handleSubmitEdgeName = () => {
    if (!currentEdge) {
      return;
    }

    const edge = { ...currentEdge };
    edge.label = edgeName;

    setCurrentEdge(edge);
    onSubmitEdge(edge);
  };

  const handleSubmit = () => {
    if (!currentNode) {
      return;
    }

    const node = { ...currentNode };
    node.data.label = nodeName;

    setCurrentNode(node);
    onSubmit(node);
  };

  const togglePanel = () => {
    setExpanded(!expanded);
  };

  const handleDeleteNode = () => {
    deleteNode(currentNode);
    setCurrentNode(null);
  };

  const handleChangeTypeEdge = (type: string) => {
    updateEdge(type, isAnimated);
  };

  const handleAnimateEdge = () => {
    const animate = !isAnimated;

    updateEdge(currentEdge?.type, animate);
    setIsAnimated(animate);
  };

  const handleChangeEdgeColor = (evt: any) => {
    const color = evt.target.value;
    updateEdge(currentEdge?.type, isAnimated, color);
  };

  useEffect(() => {
    setEdgeName(currentEdge?.label ?? "");
  }, [currentEdge]);

  useEffect(() => {
    setNodeName(currentNode?.data?.label ?? "");
  }, [currentNode]);

  useEffect(() => {
    setIsAnimated(currentEdge?.animated ?? false);
  }, [currentEdge]);

  return (
    <Panel
      position="top-right"
      className={expanded ? "updatePanel large" : "updatePanel short"}
    >
      {expanded ? (
        <>
          <span className="icon icon-ic_arrow_right" onClick={togglePanel} />
          <form>
            <h4>Edit node</h4>
            <div className="inputControl">
              <label>Name:</label>
              <input value={nodeName} onChange={handleOnChange} />
            </div>
            <Button
              onClick={handleSubmit}
              ariaLabel="submitButton"
              text="Submit"
              size="small"
            />
            <Button
              onClick={handleDeleteNode}
              type="outline"
              ariaLabel="deleteButton"
              text="Delete"
              size="small"
            />
            <h4>Edge properties</h4>
            <div className="inputControl">
              <label>Text:</label>
              <input value={edgeName} onChange={handleOnChangeEdgeName} />
            </div>
            <Button
              onClick={handleSubmitEdgeName}
              ariaLabel="submitButton"
              text="Submit"
              size="small"
            />
            <div className="edgeButtons">
              <span onClick={() => handleChangeTypeEdge("default")}>1</span>
              <span onClick={() => handleChangeTypeEdge("straight")}>2</span>
              <span onClick={() => handleChangeTypeEdge("step")}>3</span>
              <span onClick={() => handleChangeTypeEdge("smoothstep")}>4</span>
            </div>
            <div className="edgeButtons">
              <label>Animated</label>
              <Checkbox
                ariaLabel="animatedCheckbox"
                checked={isAnimated}
                onChange={handleAnimateEdge}
              />
            </div>
            <div>
              <input
                type="color"
                value={currentEdge?.style?.stroke ?? "#ffffff"}
                onChange={handleChangeEdgeColor}
              />
              <label>Stroke color</label>
            </div>
          </form>
        </>
      ) : (
        <span className="icon icon-ic_arrow_left" onClick={togglePanel} />
      )}
    </Panel>
  );
};
