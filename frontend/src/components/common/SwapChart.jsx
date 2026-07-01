import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function SuccessfulSwapChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios.get("https://cloth-exchange-backend.onrender.com/api/swap/swap-stats") // backend route
      .then(res => {
        const data = res.data;
        setChartData({
          labels: data.map(d => d.label), // e.g. "3-2026"
          datasets: [
            {
              label: "Successful Swaps",
              data: data.map(d => d.value),
              backgroundColor: "rgba(75,192,192,0.6)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1
            }
          ]
        });
      })
      .catch(err => console.error(err));
  }, []);

  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Successful Swaps Analysis</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Successful Swaps per Month"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
}

export default SuccessfulSwapChart;
