"use client";

import { useState } from "react";
import { Line } from "react-chartjs-2";
import useEffectOnce from "react-use/lib/useEffectOnce";
import { categoriesStats, productsStats } from "~/api/store";

export function CreatedCategories() {
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<string[]>([]);

  useEffectOnce(() => {
    categoriesStats()
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((json) => {
        const { categories } = json.data;

        const labels: string[] = [];
        const data: string[] = [];

        categories.map((user: any) => {
          labels.push(user.createdAt);
          data.push(user.categories);
        });

        setLabels(labels);
        setData(data);
      });
  });

  return (
    <Line
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Created categories",
          },
        },
      }}
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

export function CreatedProducts() {
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<string[]>([]);

  useEffectOnce(() => {
    productsStats()
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((json) => {
        const { products } = json.data;

        const labels: string[] = [];
        const data: string[] = [];

        products.map((user: any) => {
          labels.push(user.createdAt);
          data.push(user.products);
        });

        setLabels(labels);
        setData(data);
      });
  });

  return (
    <Line
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Created products",
          },
        },
      }}
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
