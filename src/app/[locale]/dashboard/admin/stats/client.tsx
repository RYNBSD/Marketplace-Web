"use client";

import { useEffect, useState } from "react";
import { storeStats, usersStats } from "~/api/admin";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function options(title: string) {
  return {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
}

export function Users() {
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    usersStats()
      .then((res) => res.json())
      .then((json) => {
        const { users } = json.data;

        const labels: string[] = [];
        const data: string[] = [];

        users.map((user: any) => {
          labels.push(user.createdAt);
          data.push(user.users);
        });

        setLabels(labels);
        setData(data);
      });
  }, []);

  return (
    <Line
      options={options("Users")}
      data={{
        labels,
        datasets: [
          {
            data,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      }}
    />
  );
}

export function Stores() {
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    storeStats()
      .then((res) => res.json())
      .then((json) => {
        const { stores } = json.data;

        const labels: string[] = [];
        const data: string[] = [];

        stores.map((store: any) => {
          labels.push(store.createdAt);
          data.push(store.stores);
        });

        setLabels(labels);
        setData(data);
      });
  }, []);

  return (
    <Line
      options={options("Stores")}
      data={{
        labels,
        datasets: [
          {
            data,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      }}
    />
  );
}
