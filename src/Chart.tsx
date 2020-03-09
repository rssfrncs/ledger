import React from "react";
import { useSpring, animated } from "react-spring";
import { scaleLinear } from "d3-scale";
import { area, curveBasis as curve } from "d3-shape";
import useMeasure from "react-use-measure";
import { extent } from "d3-array";
import { Max } from "./Layout";
import { theme } from "./theme";

type Datum = {
  step: number;
  value: number;
};

type Props = {
  data: Datum[];
};

export const Chart = React.memo(function({ data }: Props) {
  const [ref, { width, height }] = useMeasure({});
  const scaleX = scaleLinear()
    .range([0, width])
    .domain([0, data.length - 1]);
  const yDomainMax = extent(data, x => x.value) as [number, number];
  const scaleY = scaleLinear()
    .range([height - 5, 5])
    .domain(yDomainMax);

  const areaFn = area<Datum>()
    .x(x => scaleX(x.step))
    .x1(x => scaleX(x.step))
    .y(height)
    .y1(x => scaleY(x.value))
    .curve(curve);
  const { d } = useSpring({
    d: areaFn(data)
  });
  return (
    <Max ref={ref}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0" y2="100%">
            <stop offset="0%" stopColor={theme.secondary} />
            <stop offset="100%" stopColor={theme.primary} />
          </linearGradient>
        </defs>
        <animated.path fill="url(#gradient)" d={d} />
        <line
          stroke="#8c8c8c"
          strokeWidth={3}
          x1={0}
          x2={width}
          y1={scaleY(0)}
          y2={scaleY(0)}
        />
        <text x={0} y={scaleY(0)}>
          0
        </text>
      </svg>
    </Max>
  );
});
