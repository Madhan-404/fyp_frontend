import React from 'react'
import { Chart, ChartData, Point, registerables } from 'chart.js';
Chart.register(...registerables);
import { Scatter } from 'react-chartjs-2';

function Plot({data}) {
  return (
    <Scatter data={{datasets:[data]}}/>
  )
}

export default Plot