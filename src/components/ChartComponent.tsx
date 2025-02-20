// src/components/ChartComponent.tsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartComponentProps {
  data: ChartData<"bar">;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ data }) => {
  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Progreso de la Inversión Compuesta" },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ChartComponent;
