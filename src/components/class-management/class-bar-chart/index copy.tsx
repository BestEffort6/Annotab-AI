'use client';

import type { ApexOptions } from 'apexcharts';
import React from 'react';
import ApexCharts from 'react-apexcharts';

const ClassBarChart = () => {
  const gradientConfig = {
    shade: 'dark',
    type: 'vertical',
    shadeIntensity: 1,
    gradientToColors: ['#31374A', '#D7D8E3'],
    opacityFrom: 0.85,
    opacityTo: 0.5,
    stops: [10, 100],
    colorStops: [],
  };

  const options: ApexOptions = {
    series: [
      {
        name: 'Dataset Distribution',
        data: [12, 14, 8, 17, 21, 16, 13, 19, 15],
      },
    ],
    chart: {
      height: 653,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter(val: any) {
        return `${val}`;
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#304758'],
      },
    },
    fill: {
      colors: ['#31374A'],
      type: 'gradient',
      gradient: gradientConfig,
    },
    xaxis: {
      categories: [
        'Dataset 01',
        'Dataset 02',
        'Dataset 03',
        'Dataset 04',
        'Dataset 05',
        'Dataset 06',
        'Dataset 07',
        'Dataset 08',
        'Dataset 09',
      ],

      position: 'bottom',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter(val: any) {
          return `${val}%`;
        },
      },
    },
    title: {
      text: '',
      floating: true,
      offsetY: 330,
      align: 'center',
      style: {
        color: '#444',
      },
    },
  };

  const chart = new ApexCharts(document.querySelector('#chart')!, options);
  chart.render();

  return (
    <div className="flex w-full max-w-[1051px] flex-col items-center justify-center rounded-xl bg-white pl-4 pt-3">
      <h1 className=" w-full text-left">Dataset Distribution</h1>
      <div id="chart" className="w-full max-w-[653px]">
        <ApexCharts
          options={options}
          type="bar"
          series={options.series}
          height={350}
        />
      </div>
    </div>
  );
};

export default ClassBarChart;
