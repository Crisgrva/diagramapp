import { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background,
  ConnectionMode,
  Controls,
  MarkerType,
  MiniMap,
  OnConnect,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { ControlPanel } from "../ControlPanel/ControlPanel";
import { UpdatePanel } from "../UpdatePanel/UpdatePanel";
import "./index.css";
import {
  fitViewOptions,
  getId,
  initialEdges,
  initialNodes,
  nodeTypes,
} from "./misc";

const NodeAsHandleFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef<any>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [currentNode, setCurrentNode] = useState<any>(null);
  const [currentEdge, setCurrentEdge] = useState<any>(null);

  const onConnect: OnConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "default",
            style: { stroke: "#000000" },
            label: "",
            markerEnd: { type: MarkerType.Arrow },
          },
          eds
        )
      ),
    []
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const reactFlowBounds =
        reactFlowWrapper?.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `New node ${getId()}` },
      };

      setNodes((nds: any) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const handleOnNodeClick = (args: any) => {
    const id = args.target.dataset.id;

    const foundElement = nodes.find((node) => node.id === id);
    if (foundElement) {
      setCurrentNode(foundElement);
    }
    setCurrentEdge(null);
  };

  const handleClearNodes = () => {
    setNodes([]);
    setEdges([]);
  };

  const handleSubmitUpdateNode = (updatedNode: any) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === currentNode.id) {
          node = updatedNode;
        }
        return node;
      })
    );
  };

  const handleDeleteNode = (nodeToDelete: any) => {
    if (nodeToDelete) {
      setNodes((nds) => nds.filter((node) => node.id !== nodeToDelete.id));
    }
  };

  const handleUpdateEdge = (
    type: "default" | "straight" | "step" | "smoothstep" | "simplebezier",
    animated: boolean,
    color?: string
  ) => {
    if (currentEdge) {
      const strokeColor = color ?? currentEdge.style.stroke;

      setEdges((edges) =>
        edges.map((edge) => {
          if (edge.id === currentEdge.id) {
            const { style } = currentEdge;
            const copyStyle = { ...style };
            copyStyle.stroke = strokeColor;

            return { ...edge, type, animated, style: copyStyle };
          }
          return { ...edge };
        })
      );
    }
  };

  const handleOnPageClick = () => {
    setCurrentNode(null);
    setCurrentEdge(null);
  };

  const handleSubmitEdgeName = (updatedEdge: any) => {
    setEdges((edges) =>
      edges.map((edge) => {
        if (edge.id === currentEdge.id) {
          edge = updatedEdge;
        }
        return edge;
      })
    );
  };

  return (
    <div className="simple-floatingedges">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={fitViewOptions}
            connectionMode={ConnectionMode.Loose}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onInit={setReactFlowInstance}
            onNodeClick={handleOnNodeClick}
            onNodeDrag={handleOnNodeClick}
            onPaneClick={() => handleOnPageClick()}
            onEdgeClick={(evt, node) => setCurrentEdge(node)}
          >
            <UpdatePanel
              currentNode={currentNode}
              setCurrentNode={setCurrentNode}
              onSubmit={handleSubmitUpdateNode}
              deleteNode={handleDeleteNode}
              currentEdge={currentEdge}
              setCurrentEdge={setCurrentEdge}
              updateEdge={handleUpdateEdge}
              onSubmitEdge={handleSubmitEdgeName}
            />
            <Background />
            <Controls />
            <ControlPanel clearNodes={handleClearNodes} />
          </ReactFlow>
        </div>
        <MiniMap nodeStrokeWidth={3} zoomable pannable />
      </ReactFlowProvider>
    </div>
  );
};

export default NodeAsHandleFlow;
