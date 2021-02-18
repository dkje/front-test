import useResizeObserver from "common/hooks/useResizeObserver";
import ChartContainer from "./components/ChartContainer";
import { arc, PieArcDatum, pie, select } from "d3";
import React, { useEffect, useRef } from "react";

interface GuageChartProps {
  colors: {
    background: string;
    safe: string;
    main: string;
    warning: string;
    urgent: string;
  };
  min: number;
  max: number;
  data?: { value?: number | null };
  id: string;
}

const HalfDonutChart: React.FC<GuageChartProps> = ({
  min,
  max,
  data,
  id,
  colors,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const chartContainer = useRef<HTMLDivElement>(null);
  const dimensions = useResizeObserver(chartContainer);

  useEffect(() => {
    const value = data?.value;
    if (!dimensions || value === undefined || value === null) return;
    const svg = select(svgRef.current).data([data]);
    const { width, height } = dimensions;

    const angle = 0.8 * Math.PI;
    const radius = Math.min(width, height) / 2;
    const arcCornuer = 20;
    const thickness = 15;
    const createPie = pie<{ value: number }>().value((r) => r.value / max);
    const dataReady = createPie([{ value }]);

    const g = svg
      .selectAll(".center")
      .join("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const backArc = arc<PieArcDatum<{ value: number }>>()
      .innerRadius(radius - thickness)
      .outerRadius(radius)
      .cornerRadius(arcCornuer)
      .startAngle(angle * -1)
      .endAngle(angle);

    const mainArc = arc<PieArcDatum<{ value: number }>>()
      .innerRadius(radius - thickness)
      .outerRadius(radius)
      .cornerRadius(arcCornuer)
      .startAngle(angle * -1)
      .endAngle(function (d) {
        return -angle + d.value * 2 * angle;
      });

    svg
      .selectAll(".center")
      .join("g")
      .attr("class", "center")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    g.selectAll(".backArc")
      .data(dataReady)
      .join("path")
      .attr("fill", colors.background)
      .attr("class", "backArc")
      .attr("d", backArc);

    g.selectAll(".mainArc")
      .data(dataReady)
      .join("path")
      .attr("class", "mainArc")
      .attr("d", mainArc)
      .attr("fill", (d) => {
        if (d.value > 0.85) {
          return colors.urgent;
        }
        if (d.value > 0.75) {
          return colors.warning;
        }
        if (d.value > 0.5) {
          return colors.main;
        }
        return colors.safe;
      });

    g.select("text")
      .attr("x", 10)
      .attr("y", 12)
      .attr("text-anchor", "middle")
      .attr("transform", "translate(-10,-5)")
      .text(value);
  }, [data, dimensions]);

  return (
    <ChartContainer ref={chartContainer} id={id}>
      <svg ref={svgRef}>
        <g className="center">
          <text />
        </g>
        <path className="backArc" />
        <path className="mainArc" />
      </svg>
    </ChartContainer>
  );
};

export default React.memo(HalfDonutChart, () => false);
