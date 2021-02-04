import React, { useEffect, useMemo, useRef } from "react";
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

interface LineChartProps {
  data: { today: [number, number][]; yesterday: [number, number][] };
  id: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, id }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const chartContainer = useRef<HTMLDivElement>(null);
  const dimensions = useResizeObserver(chartContainer);

  const today = useMemo(() => {
    return data.today.map(mapUnix).filter(filter5Min);
  }, [data.today]);

  const yesterday = useMemo(() => {
    return data.yesterday.map(mapUnix).filter(filter5Min);
  }, [data.yesterday]);

  function filter5Min({ time }: ReturnType<typeof mapUnix>) {
    return time.minute() % 5 === 0 && time.second() === 0;
  }

  function mapUnix([unix, value]: [number, number]) {
    const time = moment.unix(unix / 1000);
    const xTick = time.format("HH:mm");
    return { time, value, xTick };
  }

  useEffect(() => {
    if (!dimensions) return;
    const svg = select(svgRef.current);
    const { width, height } = dimensions;

    const xScale = scaleBand()
      .domain(yesterday.map((el) => el.xTick))
      .range([35, width]);

    const yScale = scaleLinear()
      .domain([
        Math.max(
          max(today, (el) => el.value * 1.2) || 0,
          max(yesterday, (el) => el.value * 1.2) || 0
        ),
        0,
      ])
      .range([0, height]);

    // Line
    const lineGenerator = line<{ value: number; xTick: string }>()
      .x((d) => xScale(d.xTick) || 0)
      .y((d) => yScale(d.value) || 0);

    svg
      .selectAll(`.${id}_today`)
      .data([today])
      .join("path")
      .attr("class", `${id}_today`)
      .transition()
      .duration(750)
      .attr("d", lineGenerator);

    svg
      .selectAll(`.${id}_yesterday`)
      .data([yesterday])
      .join("path")
      .attr("class", `${id}_yesterday`)
      .transition()
      .duration(750)
      .attr("d", lineGenerator);

    const calcArea = area<{ xTick: string; value: number }>()
      .x((d) => xScale(d.xTick) || 0)
      .y0((d) => yScale(d.value))
      .y1(height);

    //Area
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

    //Axis
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

    //tooptip
    const tooltip = svg.select("#tooltip");
    const todayTip = svg.select(".tooltip_today");
    const yesterdayTip = svg.select(".tooltip_yesterday");
    const timeTip = svg.select(".tooltip_time");
    const tooltipLine = svg.select(".y_line");

    svg
      .selectAll(".content")
      .join("rect")
      .attr("class", "content")
      .attr("width", width - 35)
      .attr("transform", `translate(35,0)`)
      .attr("height", height)
      .attr("fill", "transparent")
      .on("mousemove", drawToolTip)
      .on("mouseout", removeToolTip);

    function drawToolTip(e: MouseEvent) {
      const eachBand = xScale.step();
      const index = Math.round((e.x - 68) / eachBand);
      const xDomain = xScale.domain()[index + 1];

      tooltipLine
        .join("line")
        .attr("class", "y_line")
        .attr("stroke", "black")
        .transition()
        .duration(10)
        .attr("x1", xScale(xDomain) || 0)
        .attr("x2", xScale(xDomain) || 0)
        .attr("y1", 0)
        .attr("y2", height);

      const yesterdayValue = yesterday.find((el) => el.xTick === xDomain);
      const todayValue = today.find((el) => el.xTick === xDomain);
      const x = e.pageX - 15 + "px";
      const topDistance = chartContainer.current?.getBoundingClientRect().top;
      const yNum = e.pageY - (topDistance || 0);

      tooltip
        .attr("x", x)
        .attr("y", e.y + "px")
        .style("display", "block");

      timeTip
        .text(yesterdayValue?.time.format("h:mm a") || "")
        .attr("x", x)
        .attr("y", yNum + 10 + "px");

      yesterdayTip
        .text("yesterday:" + yesterdayValue?.value || "")
        .attr("x", x)
        .attr("y", yNum + 25 + "px");

      todayTip
        .text(todayValue ? "today:" + todayValue?.value : "")
        .attr("x", x)
        .attr("y", yNum + 40 + "px");
    }

    function removeToolTip() {
      if (tooltip) tooltip.style("display", "none");
      if (tooltipLine) tooltipLine.attr("stroke", "none");
    }
  }, [dimensions, data]);

  return (
    <ChartContainer ref={chartContainer} id={id}>
      <svg ref={svgRef}>
        <path className="today_area" />
        <path className="yesterday_area" />
        <g className="x-axis" />
        <g className="y-axis" />
        <line className="y_line" />
        <rect className="content" />
        <text id="tooltip">
          <tspan className="tooltip_time"></tspan>
          <tspan className="tooltip_yesterday"></tspan>
          <tspan className="tooltip_today"></tspan>
        </text>
      </svg>
    </ChartContainer>
  );
};

export default React.memo(LineChart, () => false);
