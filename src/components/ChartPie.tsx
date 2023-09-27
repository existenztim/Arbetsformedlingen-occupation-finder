import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { ICompetenceShort } from "../models/ICompetenceShort";

interface ChartPieProps {
  chartData: ICompetenceShort[];
}

const ChartPie = ({ chartData }: ChartPieProps) => {
  const inputData = chartData;
  const totalPercentage = inputData.reduce(
    (sum, item) => sum + item.percent_for_occupation,
    0
  );

  const labels = inputData.map(
    (item) =>
      item.term[0].toUpperCase() +
      item.term.slice(1, 20) +
      " " +
      ((item.percent_for_occupation / totalPercentage) * 100).toFixed(2) +
      "%"
  );

  const dataValues = inputData.map((item) =>
    parseFloat(
      ((item.percent_for_occupation / totalPercentage) * 100).toFixed(2)
    )
  );

  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "% av totalen",
        data: dataValues,
        backgroundColor: [
          "#003f5c",
          "#2f4b7c",
          "#665191",
          "#a05195",
          "#d45087",
          "#f95d6a",
          "#ff7c43",
          "#ffa600",
          "#eb2d14",
          "#ff0800",
        ],
        borderColor: ["#fff"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Pie
      className="z-10"
      data={data}
      aria-label={`Ett pajdiagram med relevant data för detta yrke: ${labels}`}
    />
  );
};

export default ChartPie;
