import "./style.scss";
import React, { useEffect, useRef } from "react";
import useResizeObserver from "../../common/hooks/useResizeObserver";
import { select, scaleLinear, scaleBand } from "d3";

const RacingBarChart: React.FC<{ data: any }> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const chartContainer = useRef<HTMLDivElement>(null);
  const dimensions = useResizeObserver(chartContainer);

  useEffect(() => {
    if (!dimensions) return;
    const { width, height } = dimensions;
    console.log(dimensions);
    const svg = select(svgRef.current);
    // const yScale = scaleBand().domain().range([0, width]).padding(0.3);
    // const xScale = scaleLinear().domain([]).range([0, height]);
  }, [data, dimensions]);

  return (
    <div ref={chartContainer}>
      <svg ref={svgRef} />
    </div>
  );
};

export default RacingBarChart;
