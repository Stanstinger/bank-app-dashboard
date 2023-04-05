import React from "react";
import { ResponsiveBar } from "@nivo/bar";

function BarChart({ account }) {
  const transactionMonths = {};

  account.transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const key = `${month}`;
    // const key = `${month}-${year}`;

    if (!transactionMonths[key]) {
      transactionMonths[key] = 0;
    }

    transactionMonths[key] += parseFloat(transaction.amount);
  });

  const monthKeys = Object.keys(transactionMonths).sort();
  const data = monthKeys.map((key) => ({
    month: key,
    total: transactionMonths[key].toFixed(2),
  }));
  return (
    <ResponsiveBar
      data={data}
      keys={["total"]}
      indexBy="month"
      margin={{ top: 50, right: 70, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Month",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Income",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart of transaction totals by month"
      barAriaLabel={function (e) {
        return;
      }}
    />
  );
}

export default BarChart;
