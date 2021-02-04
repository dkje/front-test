import React, { useEffect, useRef } from "react";
import ChartContainer from "./components/ChartContainer";
import useResizeObserver from "common/hooks/useResizeObserver";
import {
  area,
  axisBottom,
  axisLeft,
  line,
  max,
  scaleBand,
  scaleLinear,
  select,
} from "d3";
import moment from "moment";
import ChartErrorWrapper from "components/ChartErrorWrapper";

interface LineChartProps {
  data: { today: [number, number][]; yesterday: [number, number][] };
  id: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, id }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const chartContainer = useRef<HTMLDivElement>(null);
  const dimensions = useResizeObserver(chartContainer);

  const filter5Min = ({ time }: ReturnType<typeof mapUnix>) => {
    return time.minute() % 5 === 0 && time.second() === 0;
  };

  const mapUnix = ([unix, value]: [number, number]) => {
    const time = moment.unix(unix / 1000);
    const xTick = time.format("HH:mm");
    return { time, value, xTick };
  };

  useEffect(() => {
    if (!dimensions) return;
    const today = data.today.map(mapUnix).filter(filter5Min);
    const yesterday = data.yesterday.map(mapUnix).filter(filter5Min);
    const svg = select(svgRef.current);
    const { width, height } = dimensions;

    const xScale = scaleBand()
      .domain(yesterday.map((el) => el.xTick))
      .range([35, width]);

    const yScale = scaleLinear()
      .domain([max(today, (el) => el.value * 1.2) || 100, 0])
      .range([0, height]);

    const lineGenerator = line<{ value: number; xTick: string }>()
      .x((d) => xScale(d.xTick) || 0)
      .y((d) => yScale(d.value) || 0);

    svg
      .selectAll(`.${id}_today`)
      .data([today])
      .join("path")
      .attr("class", `${id}_today`)
      .attr("d", lineGenerator);

    svg
      .selectAll(`.${id}_yesterday`)
      .data([yesterday])
      .join("path")
      .attr("class", `${id}_yesterday`)
      .attr("d", lineGenerator);

    const calcArea = area<{ xTick: string; value: number }>()
      .x((d) => xScale(d.xTick) || 0)
      .y0((d) => yScale(d.value))
      .y1(height);

    svg
      .selectAll(".today_area")
      .data([today])
      .join("path")
      .attr("class", "today_area")
      .attr("d", calcArea);

    svg
      .selectAll(".yesterday_area")
      .data([yesterday])
      .join("path")
      .attr("class", "yesterday_area")
      .attr("d", calcArea);

    const yAxis = axisLeft(yScale).ticks(5);
    svg.select(".y-axis").remove();
    svg
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(35,0)`)
      .call(yAxis);

    const xAxis = axisBottom(xScale).tickValues(
      ["03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"].filter(
        (el, i) => {
          if (width > 700) return true;
          if (width > 500) return i % 2 === 0;
          if (width > 200) return i % 3 === 0;
        }
      )
    );
    svg.select(".x-axis").remove();
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);
  }, [dimensions, data]);

  return (
    <ChartErrorWrapper>
      <ChartContainer ref={chartContainer} id={id}>
        <svg ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </ChartContainer>
    </ChartErrorWrapper>
  );
};

export default React.memo(LineChart, () => false);
