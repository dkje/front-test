import useResizeObserver from "common/hooks/useResizeObserver";
import ChartContainer from "./components/ChartContainer";
import { select, arc, pie, PieArcDatum } from "d3";
import React, { useEffect, useRef } from "react";

type Record = { key: string; value: any[] };

interface DonutChartProps {
  data?: Record[];
  id: string;
  colors: string[];
}

const DonutChart: React.FC<DonutChartProps> = ({ data, id, colors }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const chartContainer = useRef<HTMLDivElement>(null);
  const dimensions = useResizeObserver(chartContainer);

  useEffect(() => {
    if (!dimensions || !data) return;
    const svg = select(svgRef.current);
    const { width, height } = dimensions;

    const radius = Math.min(width, height) / 2;

    const g = svg
      .selectAll(".center")
      .join("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);
    const createPie = pie<Record>().value(
      (r: { value: any[] }) => r.value.length
    );
    const dataReady = createPie(data);

    const innerArc = arc<PieArcDatum<Record>>()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.8);

    g.selectAll(".arc").remove();

    g.selectAll(".arc")
      .data(dataReady)
      .enter()
      .append("path")
      .attr("class", "arc")
      .attr("d", innerArc)
      .attr("fill", (d, i) => colors[i % colors.length])
      .attr("stroke", "#fff")
      .style("stroke-width", "1.5px")
      .style("opacity", 0.8);

    svg.selectAll(".allLabels").remove();
  }, [data, dimensions]);

  return (
    <ChartContainer ref={chartContainer} id={id}>
      <svg ref={svgRef}>
        <g className="center">
          <path className="arc">
            <g className="labels"></g>
          </path>
        </g>
      </svg>
    </ChartContainer>
  );
};

export default DonutChart;
