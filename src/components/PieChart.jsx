import React from "react";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";

const PieChart = ({ transactions }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const balanceSummary = transactions.reduce((acc, curr) => {
    const amt = parseFloat(curr.amount);
    return acc + amt;
  }, 0);

  const incomeSummary = transactions
    .filter((transaction) => parseFloat(transaction.amount) > 0)
    .reduce((acc, curr) => {
      return acc + parseFloat(curr.amount);
    }, 0);

  const outcomeSummary = transactions
    .filter((transaction) => parseFloat(transaction.amount) < 0)
    .reduce((acc, curr) => {
      return acc + parseFloat(curr.amount);
    }, 0);

  const interest = transactions
    .filter((transaction) => parseFloat(transaction.amount) > 0)
    .map((transaction) => parseFloat(transaction.amount) * (1.2 / 100))
    .filter((int) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  const data = [
    {
      id: "IN",
      label: "Income",
      value: Math.abs(incomeSummary).toFixed(2),
      color: colors.greenAccent[400],
    },
    {
      id: "OUT",
      label: "Outcome",
      value: Math.abs(outcomeSummary).toFixed(2),
      color: colors.redAccent[500],
    },
    {
      id: "INTEREST",
      label: "Interest",
      value: interest.toFixed(2),
      color: colors.blueAccent[400],
    },
    {
      id: "BALANCE",
      label: "Balance",
      value: Math.abs(balanceSummary).toFixed(2),
      color: colors.blueAccent[400],
    },
  ];

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 110 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "IN",
          },
          id: "IN",
        },
        {
          match: {
            id: "c",
          },
          id: "dots",
        },
        {
          match: {
            id: "go",
          },
          id: "dots",
        },
        {
          match: {
            id: "python",
          },
          id: "dots",
        },
        {
          match: {
            id: "scala",
          },
          id: "lines",
        },
        {
          match: {
            id: "lisp",
          },
          id: "lines",
        },
        {
          match: {
            id: "elixir",
          },
          id: "lines",
        },
        {
          match: {
            id: "javascript",
          },
          id: "lines",
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
