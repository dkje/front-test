import "./style.scss";
import React, { useEffect, useRef } from "react";
import useResizeObserver from "../../common/hooks/useResizeObserver";
import { select, scaleLinear, scaleBand, active } from "d3";

type Status = {
  title: string;
  value: number | null;
};

const colors = [
  "rgb(33, 121, 238)",
  "rgb(0, 204, 154)",
  "rgb(255, 103, 89)",
  "rgb(240, 185, 91)",
  "rgb(117, 55, 239)",
];

const RacingBarChart: React.FC<{ activeStatus: Status[] }> = ({
  activeStatus,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const chartContainer = useRef<HTMLDivElement>(null);
  const dimensions = useResizeObserver(chartContainer);

  useEffect(() => {
    if (!dimensions) return;
    const { width, height } = dimensions;
    const svg = select(svgRef.current);

    const yScale = scaleBand()
      .domain(activeStatus.map((entry, i) => entry.title))
      .range([0, height])
      .padding(0.3);

    const xScale = scaleLinear()
      .domain([0, Math.max(...activeStatus.map((el) => el.value || 0)) * 1.5])
      .range([0, width]);

    svg
      .selectAll(".bar")
      .data(activeStatus)
      .join("rect")
      .attr("class", "bar")
      .attr("fill", (_, i) => colors[i])
      .attr("height", yScale.bandwidth())
      .attr("y", (entry: { title: string }) => yScale(entry.title) || 0)
      .attr("x", 15)
      .transition()
      .duration(400)
      .attr("width", (entry) => xScale(Number(entry.value)));

    svg
      .selectAll(".bar_tail")
      .data(activeStatus)
      .join("rect")
      .attr("class", "bar_tail")
      .attr("fill", (_, i) => colors[i])
      .attr("height", yScale.bandwidth())
      .attr("y", (entry: { title: string }) => yScale(entry.title) || 0)
      .transition()
      .duration(400)
      .attr("x", (entry) => xScale(Number(entry.value)) + 15)
      .attr("width", 3);

    svg
      .selectAll(".yAxis")
      .data(activeStatus)
      .join("line")
      .attr("class", "yAxis")
      .attr("x1", 15)
      .attr("x2", 15)
      .attr("y1", 0)
      .attr("y2", height);

    svg
      .selectAll(".label")
      .data(activeStatus)
      .join("text")
      .text((entry) => entry.title)
      .attr("class", "label")
      .attr("x", 25)
      .attr("height", yScale.bandwidth())
      .attr("y", (entry: { title: string }) => {
        const y = yScale(entry.title);
        if (y) return y + yScale.bandwidth() / 2 + 5;
        return 0;
      });

    svg
      .selectAll(".value")
      .data(activeStatus)
      .join("text")
      .text((entry) => entry.value)
      .attr("class", "label")
      .attr("x", 5)
      .attr("height", yScale.bandwidth())
      .attr("y", (entry: { title: string }) => {
        const y = yScale(entry.title);
        if (y) return y + yScale.bandwidth() / 2 + 4;
        return 0;
      });
  }, [activeStatus, dimensions]);

  return (
    <div ref={chartContainer} className="racing_chart_container">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default React.memo(RacingBarChart, () => false);
