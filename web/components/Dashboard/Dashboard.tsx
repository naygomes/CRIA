"use client";
import { BarChart, Typography } from "@/components";
import { IGetSummaryResponse } from "@/types";

const DASHBOARD_LABEL = "Dashboard de Alertas";
const NO_ALERTS_LABEL = "Nenhum alerta ativo encontrado.";

interface IDashboardProps {
  summary: IGetSummaryResponse | null;
}

export function Dashboard({ summary }: IDashboardProps) {
  return (
    <div className="w-full flex flex-col items-center gap-10">
      <Typography
        level="h1"
        weight="bold"
        align="center"
        color="text-vm-primary"
      >
        {DASHBOARD_LABEL}
      </Typography>
      {summary !== null ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
          <BarChart summary={summary} />
        </div>
      ) : (
        <Typography level="h3" align="center" color="text-vm-navy">
          {NO_ALERTS_LABEL}
        </Typography>
      )}
    </div>
  );
}
