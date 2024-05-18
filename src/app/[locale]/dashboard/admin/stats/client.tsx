"use client";

import { useEffect, useState } from "react";
import { categoryStats, orderStats, productStats, storeStats, usersStats } from "~/api/admin";

import { Line } from "react-chartjs-2";

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
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Users",
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
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Stores",
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

export function Products() {
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    productStats()
      .then((res) => res.json())
      .then((json) => {
        const { products } = json.data;

        const labels: string[] = [];
        const data: string[] = [];

        products.map((store: any) => {
          labels.push(store.createdAt);
          data.push(store.products);
        });

        setLabels(labels);
        setData(data);
      });
  }, []);

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
            text: "Products",
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

export function Categories() {
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    categoryStats()
      .then((res) => res.json())
      .then((json) => {
        const { categories } = json.data;

        const labels: string[] = [];
        const data: string[] = [];

        categories.map((store: any) => {
          labels.push(store.createdAt);
          data.push(store.categories);
        });

        setLabels(labels);
        setData(data);
      });
  }, []);

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
            text: "Categories",
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

export function Orders() {
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    orderStats()
      .then((res) => res.json())
      .then((json) => {
        const { orders } = json.data;

        const labels: string[] = [];
        const data: string[] = [];

        orders.map((store: any) => {
          labels.push(store.createdAt);
          data.push(store.orders);
        });

        setLabels(labels);
        setData(data);
      });
  }, []);

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
            text: "Orders",
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