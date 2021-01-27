import "./style.scss";
import React, { useEffect, useRef } from "react";
import useResizeObserver from "../../common/hooks/useResizeObserver";
import { select, scaleLinear, scaleBand, axisLeft } from "d3";

type TypeOfActiveStatus = {
  title: string;
  value: number;
};

const RacingBarChart: React.FC<{ activeStatus: TypeOfActiveStatus[] }> = ({
  activeStatus,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const chartContainer = useRef<HTMLDivElement>(null);
  const dimensions = useResizeObserver(chartContainer);

  useEffect(() => {
    if (!dimensions) return;
    console.log("------activeStatus:", activeStatus);
    const { width, height } = dimensions;
    const svg = select(svgRef.current);

    const yScale = scaleBand()
      .domain(activeStatus.map((entry, i) => i.toString()))
      .range([0, height])
      .padding(0.2);

    const xScale = scaleLinear()
      .domain([0, Math.max(...activeStatus.map((el) => el.value)) * 1.1])
      .range([0, width]);

    const yAxis = axisLeft(yScale);
    svg.selectAll(".yAxis").remove();
    svg
      .append("g")
      .attr("class", "yAxis")
      .attr("transform", `translate(15,0)`)
      .call(yAxis);

    svg
      .selectAll(".bar")
      .data(activeStatus)
      .join("rect")
      .attr("class", "bar")
      .attr("transform", `translate(15,0)`)
      .attr("height", yScale.bandwidth())
      .attr("y", (entry, i) => yScale(i.toString()) || "0")
      .attr("x", 0)
      .transition()
      .duration(400)
      .attr("width", (entry) => xScale(Number(entry.value)));

    svg
      .selectAll(".label")
      .data(activeStatus)
      .join("text")
      .text((entry) => entry.title)
      .attr("class", "label")
      .attr("x", 25)
      .attr("height", 10)
      .attr(
        "y",
        (_, i) => (yScale(i.toString()) || 0) + yScale.bandwidth() / 2 + 5
      );
  }, [activeStatus, dimensions]);

  return (
    <div ref={chartContainer} className="racing_chart_container">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default React.memo(RacingBarChart, () => false);
