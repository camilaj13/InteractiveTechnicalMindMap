import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import * as d3 from "d3";

// ───────────────────── DATA IMPORTS (Ensure these files live alongside src/components/) ─────────────────────
import { canonguarddata } from "../canonguarddata";
import { slitherData } from "../slitherData";
import { tameshidata } from "../tameshidata";
import { bulloakdata } from "../bulloakdata";
import { talirdata } from "../talirdata";
import { wazuhdata } from "../wazuhdata";

// Define the structure to support both data formats (name/title)
// Using 'any' for HierarchyNode compatibility, but enforcing structure via NodeDataProps
export interface NodeDataProps {
  id?: string;
  title?: string;
  name?: string;
  tooltip?: string;
  tags?: string[];
  link?: string;
  children?: NodeDataProps[];
  _children?: NodeDataProps[]; // Used by D3 to hide children
  // Calculated properties
  width?: number;
  height?: number;
}

const cloneData = (data: NodeDataProps) =>
  JSON.parse(JSON.stringify(data)) as NodeDataProps;

const collapseDescendantsInPlace = (node?: NodeDataProps) => {
  if (!node || !node.children) {
    return;
  }

  node.children.forEach((child) => collapseDescendantsInPlace(child));
  node._children = node.children;
  node.children = undefined;
};

const prepareRootData = (source?: NodeDataProps | null) => {
  if (!source) {
    return null;
  }

  const clone = cloneData(source);

  if (clone.children) {
    clone.children.forEach((child) => collapseDescendantsInPlace(child));
  }

  return clone;
};

// Map of available data sources for the selector
const DATA_SOURCES: Record<string, NodeDataProps> = {
  tameshi: tameshidata,
  canonguard: canonguarddata,
  slither: slitherData,
  bulloak: bulloakdata,
  talir: talirdata,
  wazuh: wazuhdata,
};

// ───────────────────── CONSTANTS AND STYLE ─────────────────────
const COLOR_PALETTE = [
  "#F97316", // 0: Vibrant Orange (Root)
  "#FDE047", // 1: Yellow/Gold (Children)
  "#4ADE80", // 2: Light Green (Grandchildren)
  "#7DD3FC", // 3: Sky Blue (Great-grandchildren & Deeper)
];

const colorScale = d3
  .scaleOrdinal<number, string>()
  .domain(d3.range(COLOR_PALETTE.length))
  .range(COLOR_PALETTE);

const NODE_FILL_BASE = "#0f0f0f";
const SVG_BACKGROUND = "#0f0f0f";
const FONT_SIZE = 14;
const ROOT_RADIUS = 50;
const HORIZONTAL_SPACING = 250;
const VERTICAL_SPACING_MIN = 35;
const NODE_PADDING = 10;
const TRANSITION_DURATION = 400;
const TOOLTIP_OFFSET = 15; // Offset tooltip slightly more

// Type for D3 hierarchy nodes with our data structure
type HierarchyPointNodeWithData = d3.HierarchyPointNode<NodeDataProps>;

const MindMap = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null); // Ref for tooltip div
  const [currentDataKey, setCurrentDataKey] =
    useState<keyof typeof DATA_SOURCES>("tameshi");
  const [rootData, setRootData] = useState<NodeDataProps | null>(() =>
    prepareRootData(DATA_SOURCES["tameshi"]),
  );

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const previousTitle = document.title;
    document.title = "Interactive Technical MindMap";

    return () => {
      document.title = previousTitle;
    };
  }, []);

  const treeLayout = useMemo(() => d3.tree<NodeDataProps>(), []);

  const linkPathGenerator = useMemo(
    () =>
      d3
        .linkHorizontal<any, HierarchyPointNodeWithData>()
        .x((d) => d.y)
        .y((d) => d.x),
    [],
  );

  const resetVisualization = useCallback(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("#mindmap-g").remove();
  }, []);

  const toggleNode = useCallback(
    (d: HierarchyPointNodeWithData) => {
      if (d.data.children) {
        d.data.children.forEach((child) => collapseDescendantsInPlace(child));
        d.data._children = d.data.children;
        d.data.children = undefined;
      } else if (d.data._children) {
        d.data.children = d.data._children;
        d.data._children = undefined;
      }
    },
    [],
  );

  // Helper function to get the node's display name
  const getNodeName = (d: HierarchyPointNodeWithData) =>
    d.data.name || d.data.title || "Unknown";

  const update = useCallback(
    (source: HierarchyPointNodeWithData) => {
      if (!svgRef.current || !rootData) return;

      const svg = d3.select(svgRef.current);
      const tooltip = d3.select(tooltipRef.current); // Use ref for tooltip selection
      const { height: svgHeight } = svgRef.current.getBoundingClientRect();

      // 1. Compute the new tree layout.
      const root = d3.hierarchy(
        rootData,
        (d) => d.children,
      ) as HierarchyPointNodeWithData;
      const nodes = root.descendants();
      const links = root.links();

      treeLayout
        .size([nodes.length * VERTICAL_SPACING_MIN, 10000])
        .separation((a, b) => {
          return a.parent === b.parent ? 1.5 : 2.5;
        });

      treeLayout(root);

      nodes.forEach((d) => {
        d.y = d.depth * HORIZONTAL_SPACING;
        // Ensure x0/y0 are initialized correctly for transitions
        if (d.x0 === undefined) d.x0 = source.x;
        if (d.y0 === undefined) d.y0 = source.y;
      });

      // Center the root node vertically
      if (root.x !== undefined) {
        const xOffset = root.x;
        nodes.forEach((d) => {
          if (d.x !== undefined) d.x -= xOffset;
        });
      }

      // 2. Select the main visualization group.
      let g = svg.select<SVGGElement>("#mindmap-g");
      if (g.empty()) {
        g = svg.append("g").attr("id", "mindmap-g");
        const initialTransform = d3.zoomIdentity.translate(50, svgHeight / 2);
        g.attr("transform", initialTransform.toString());
        svg.call(
          d3
            .zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.1, 4])
            .on("zoom", (event) => {
              g.attr("transform", event.transform.toString()); // Ensure transform is string
            }) as any,
          initialTransform, // Apply initial transform
        );
      }

      // 3. Update the Nodes
      const node = g
        .selectAll<SVGGElement, HierarchyPointNodeWithData>("g.node")
        .data(
          nodes,
          (d) => d.data.id || getNodeName(d) || `node-${Math.random()}`,
        ); // Fallback ID

      // Enter new nodes
      const nodeEnter = node
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", `translate(${source.y0},${source.x0})`)
        .style("cursor", "pointer") // Add cursor pointer to the group
        .on("click", (event, d) => {
          toggleNode(d);
          update(d);
        })
        .on("mouseover", (event, d) => {
          // FIX: Improved Tooltip Positioning Logic
          const tooltipContent =
            d.data.tooltip || "(Description not provided.)";

          tooltip
            .style("opacity", 1)
            .html(`<strong>${getNodeName(d)}</strong><br/>${tooltipContent}`)
            // Position near mouse, but prevent going off-screen (basic boundary check)
            .style(
              "left",
              `${Math.min(event.pageX + TOOLTIP_OFFSET, window.innerWidth - 300)}px`,
            ) // Avoid right edge
            .style("top", `${event.pageY + TOOLTIP_OFFSET}px`) // Slightly below cursor
            .style("transform", null); // Remove previous transform if any
        })
        .on("mouseout", () => {
          tooltip.style("opacity", 0);
        });

      // Text element
      nodeEnter
        .append("text")
        .attr("dy", ".35em")
        .attr("x", NODE_PADDING)
        .attr("y", 0)
        .attr("text-anchor", "start")
        .style("fill-opacity", 0)
        .style("font-size", `${FONT_SIZE}px`)
        .style("font-weight", (d) => (d.depth === 0 ? "bold" : "normal"))
        .style("fill", (d) => colorScale(d.depth % COLOR_PALETTE.length))
        .text((d) => getNodeName(d))
        .each(function (d) {
          const bbox = (this as SVGTextElement).getBBox();
          d.data.width = bbox.width;
          d.data.height = bbox.height;
        });

      // Node shape (Circle/Rect)
      nodeEnter.each(function (d: any) {
        const group = d3.select(this);
        const nodeColor = colorScale(d.depth % COLOR_PALETTE.length);

        if (d.depth === 0) {
          group
            .insert("circle", "text")
            .attr("r", ROOT_RADIUS)
            .attr("fill", NODE_FILL_BASE)
            .attr("stroke", nodeColor)
            .attr("stroke-width", 2.5)
            .attr("cx", 0)
            .attr("cy", 0);
        } else {
          const rectWidth = (d.data.width || 0) + NODE_PADDING * 2;
          const rectHeight = (d.data.height || 0) + NODE_PADDING * 2;
          const rx = rectHeight / 2;

          group
            .insert("rect", "text")
            .attr("rx", rx)
            .attr("ry", rx)
            .attr("fill", NODE_FILL_BASE)
            .attr("stroke", nodeColor)
            .attr("stroke-width", 1.5)
            .attr("x", 0)
            .attr("y", -(rectHeight / 2))
            .attr("width", rectWidth)
            .attr("height", rectHeight);
        }
      });

      // Add circle for expandable nodes
      nodeEnter
        .append("circle")
        .attr("class", "node-toggle")
        .attr("r", 5)
        .attr("cx", (d) => (d.data.width || 0) + 2 * NODE_PADDING)
        .attr("cy", 0)
        .style("fill", (d) =>
          d.data._children
            ? colorScale(d.depth % COLOR_PALETTE.length)
            : "transparent",
        )
        .style("stroke", (d) => colorScale(d.depth % COLOR_PALETTE.length))
        .style("stroke-width", 1)
        .style("opacity", (d) => (d.data.children || d.data._children ? 1 : 0));

      // Transition nodes to their new position (Update)
      const nodeUpdate = nodeEnter.merge(node);

      nodeUpdate
        .transition()
        .duration(TRANSITION_DURATION)
        .attr("transform", (d) => `translate(${d.y},${d.x})`);

      // Text update
      nodeUpdate
        .select("text")
        .transition()
        .duration(TRANSITION_DURATION)
        .style("fill-opacity", 1)
        .attr("x", (d) => (d.depth === 0 ? 0 : NODE_PADDING))
        .attr("text-anchor", (d) => (d.depth === 0 ? "middle" : "start"))
        .style("fill", (d) => colorScale(d.depth % COLOR_PALETTE.length))
        .text((d) => getNodeName(d));

      // Node shape update
      nodeUpdate
        .select("circle, rect")
        .style("fill", NODE_FILL_BASE)
        .style("stroke", (d) => colorScale(d.depth % COLOR_PALETTE.length));

      // Toggle circle update
      nodeUpdate
        .select(".node-toggle")
        .attr("cx", (d) => (d.data.width || 0) + NODE_PADDING * 2)
        .style("fill", (d) =>
          d.data._children
            ? colorScale(d.depth % COLOR_PALETTE.length)
            : "transparent",
        )
        .style("opacity", (d) => (d.data.children || d.data._children ? 1 : 0));

      // Transition exiting nodes
      const nodeExit = node
        .exit()
        .transition()
        .duration(TRANSITION_DURATION)
        .attr("transform", `translate(${source.y},${source.x})`) // Use final calculated position
        .style("opacity", 1e-6) // Fade out
        .remove();

      nodeExit.select("circle, rect").attr("r", 1e-6).attr("width", 1e-6); // Shrink shape
      nodeExit.select("text").style("fill-opacity", 1e-6);
      nodeExit.select(".node-toggle").style("opacity", 1e-6);

      // 4. Update the Links
      const link = g
        .selectAll<SVGPathElement, d3.HierarchyLink<NodeDataProps>>("path.link")
        .data(
          links,
          (d) =>
            d.target.data.id ||
            getNodeName(d.target) ||
            `link-${Math.random()}`,
        ); // Use target ID/Name for key

      // Enter any new links
      const linkEnter = link
        .enter()
        .insert("path", "g")
        .attr("class", "link")
        .style("fill", "none")
        .style("stroke", (d) =>
          colorScale(d.source.depth % COLOR_PALETTE.length),
        )
        .style("stroke-width", 1.5)
        .attr("d", (d) => {
          const o = { y: source.y0, x: source.x0 };
          return linkPathGenerator({ source: o, target: o });
        });

      // Transition links to their new position (Update)
      linkEnter
        .merge(link)
        .transition()
        .duration(TRANSITION_DURATION)
        .attr("d", (d) => {
          const sourceNode = d.source.data;

          const sourceRectWidth = (sourceNode.width || 0) + 2 * NODE_PADDING;
          // Connect link from the edge of the shape
          const sourceOffset =
            d.source.depth === 0 ? ROOT_RADIUS : sourceRectWidth;
          const targetOffset = 0; // Connect link to the start of the child node

          const adjustedSource = {
            y: d.source.y + sourceOffset,
            x: d.source.x,
          };
          const adjustedTarget = {
            y: d.target.y + targetOffset,
            x: d.target.x,
          };
          return linkPathGenerator({
            source: adjustedSource,
            target: adjustedTarget,
          });
        });

      // Transition exiting links
      link
        .exit()
        .transition()
        .duration(TRANSITION_DURATION)
        .style("stroke-opacity", 1e-6) // Fade out
        .attr("d", (d) => {
          // Transition exit link to source's final position
          const o = { y: source.y, x: source.x };
          return linkPathGenerator({ source: o, target: o });
        })
        .remove();

      // Store current positions for next transition
      nodes.forEach((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    },
    [rootData, treeLayout, toggleNode, linkPathGenerator, getNodeName],
  );

  // Effect to run the initial draw and to re-run when rootData changes
  useEffect(() => {
    if (!rootData) return;

    const initialRoot = d3.hierarchy(rootData as any) as HierarchyPointNodeWithData;
    // Set initial x0, y0 for source node in update
    initialRoot.x0 = svgRef.current
      ? svgRef.current.getBoundingClientRect().height / 2
      : 0;
    initialRoot.y0 = 0;
    update(initialRoot);
  }, [rootData, update]);

  // Handler for data source selection change
  const handleDataChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newKey = event.target.value as keyof typeof DATA_SOURCES;
    const nextData = DATA_SOURCES[newKey];

    if (!nextData) {
      console.error(
        `[MindMap] No dataset registered for key "${newKey}". Available keys: ${Object.keys(
          DATA_SOURCES,
        ).join(", ")}`,
      );
      return;
    }

    const prepared = prepareRootData(nextData);

    if (!prepared) {
      console.error(`[MindMap] Dataset "${newKey}" resolved to empty data.`);
      return;
    }

    resetVisualization();
    setCurrentDataKey(newKey);
    setRootData(prepared);
  };

  return (
    <>
      {/* ───────────────────── Data Selector UI ───────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 10,
          backgroundColor: SVG_BACKGROUND,
          padding: "10px",
          borderRadius: "6px",
          color: "white",
          border: `1px solid ${COLOR_PALETTE[0]}`,
        }}
      >
        <label htmlFor="data-selector">Select Mind Map Data: </label>
        <select
          id="data-selector"
          value={currentDataKey}
          onChange={handleDataChange}
          style={{
            marginLeft: "10px",
            padding: "5px",
            backgroundColor: SVG_BACKGROUND,
            color: COLOR_PALETTE[0],
            border: `1px solid ${COLOR_PALETTE[0]}`,
            borderRadius: "4px",
          }}
        >
          {Object.keys(DATA_SOURCES).map((key) => (
            <option key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* ───────────────────── SVG Container ───────────────────── */}
      <svg
        ref={svgRef}
        width="100%"
        height="100vh"
        style={{ background: SVG_BACKGROUND, cursor: "grab" }}
      />

      {/* ───────────────────── Tooltip ───────────────────── */}
      <div
        ref={tooltipRef} // Use ref for D3 selection
        id="tooltip"
        style={{
          position: "absolute",
          opacity: 0,
          padding: "8px 12px",
          background: NODE_FILL_BASE,
          color: "#CCCCCC", // Light gray typography
          border: `1px solid ${COLOR_PALETTE[2]}`,
          borderRadius: "4px",
          pointerEvents: "none",
          maxWidth: "300px",
          lineHeight: "1.4",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          fontSize: "14px",
          zIndex: 100,
          transition: "opacity 0.2s ease-out", // Add smooth transition
        }}
      />
    </>
  );
};

export default MindMap;
