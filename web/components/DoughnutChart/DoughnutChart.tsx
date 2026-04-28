import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components";
import { IGetSummaryResponse } from "@/types";

ChartJS.register(ArcElement, Tooltip, Legend);

const NEIGH_ALERTS_LABEL = "Alertas por Bairro";
const DESCRIPTION_CHART = "Distribuição de alertas ativos por bairro.";

const options = {
  layout: {},
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        padding: 10,
      },
    },
  },
};

interface IDoughnutChartProps {
  summary: IGetSummaryResponse | null;
}

export function DoughnutChart({ summary }: IDoughnutChartProps) {
  const perNeighborhood = summary?.alerts?.perNeighborhood || {};
  const labels = Object.keys(perNeighborhood);
  const dataValues = Object.values(perNeighborhood);

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>{NEIGH_ALERTS_LABEL}</CardTitle>
        <CardDescription>{DESCRIPTION_CHART}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center">
        <Doughnut data={data} options={options} />
      </CardContent>
    </Card>
  );
}
