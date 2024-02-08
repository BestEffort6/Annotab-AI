'use client';

import type { ScaleBand, ScaleLinear } from 'd3';
import { axisBottom, axisLeft, scaleBand, scaleLinear, select } from 'd3';
import { useEffect, useRef } from 'react';

import type { IData } from '@/types/bar-chart';

interface BarChartProps {
  data: IData[];
}

interface AxisBottomProps {
  scale: ScaleBand<string>;
  transform: string;
}

interface AxisLeftProps {
  scale: ScaleLinear<number, number, never>;
}

interface BarsProps {
  data: BarChartProps['data'];
  height: number;
  scaleX: AxisBottomProps['scale'];
  scaleY: AxisLeftProps['scale'];
}

const chartData: IData[] = [
  { label: 'Dataset 01', value: 12 },
  { label: 'Dataset 02', value: 14 },
  { label: 'Dataset 03', value: 8 },
  { label: 'Dataset 04', value: 17 },
  { label: 'Dataset 05', value: 21 },
  { label: 'Dataset 06', value: 16 },
  { label: 'Dataset 07', value: 13 },
  { label: 'Dataset 08', value: 19 },
  { label: 'Dataset 09', value: 15 },
];

const AxisBottom = ({ scale, transform }: AxisBottomProps) => {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisBottom(scale).tickFormat(() => ''));
    }
  }, [scale]);

  return <g ref={ref} transform={transform} />;
};

const AxisLeft = ({ scale }: AxisLeftProps) => {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisLeft(scale).tickFormat(() => ''));
    }
  }, [scale]);

  return <g ref={ref} />;
};

const Bars = ({ data, height, scaleX, scaleY }: BarsProps) => {
  const gradientId = 'barGradient';
  const gradientColorStart = '#6D7387';
  const gradientColorEnd = '#D7D8E3';

  return (
    <>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="10%" x2="0%" y2="100%">
          <stop offset="10%" stopColor={gradientColorStart} />
          <stop offset="100%" stopColor={gradientColorEnd} />
        </linearGradient>
      </defs>

      {data.map(({ value, label }) => (
        <g key={`bar-group-${label}`}>
          <rect
            x={scaleX(label)!}
            y={scaleY(value)!}
            width={scaleX.bandwidth()}
            height={height - scaleY(value)!}
            fill="url(#barGradient)"
            rx={5}
            ry={5}
          />
          <text
            transform={`translate(${scaleX(label)! + scaleX.bandwidth() / 2}, ${
              scaleY(value)! + (height - scaleY(value)!) / 2
            }) rotate(-90)`}
            dy="0.35em"
            textAnchor="middle"
            fill="#000000"
            fontSize={12}
          >
            {label}
          </text>
          <text
            x={scaleX(label)! + scaleX.bandwidth() / 2}
            y={scaleY(value)! - 5}
            textAnchor="middle"
            fill="#000000"
            fontSize={12}
          >
            {value}
          </text>
        </g>
      ))}
    </>
  );
};

export const ClassBarChart = () => {
  const margin = { top: 20, right: 0, bottom: 20, left: 30 };
  const width = 653 - margin.left - margin.right;
  const height = 297 - margin.top - margin.bottom;

  const scaleX = scaleBand()
    .domain(chartData.map(({ label }) => label))
    .range([0, width])
    .padding(0.5);
  const scaleY = scaleLinear()
    .domain([0, Math.max(...chartData.map(({ value }) => value))])
    .range([height, 0]);

  return (
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} />
        <AxisLeft scale={scaleY} />
        <Bars
          data={chartData}
          height={height}
          scaleX={scaleX}
          scaleY={scaleY}
        />
      </g>
    </svg>
  );
};
