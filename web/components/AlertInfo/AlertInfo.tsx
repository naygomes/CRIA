import {
  Typography,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Alert,
} from "@/components";
import { IChild } from "@/types";
import { ALERT_LABELS } from "@/utils";

type AlertKey = keyof typeof ALERT_LABELS;

interface IAlertInfoProps {
  type: "saude" | "educacao" | "assistencia_social";
  child: IChild;
}

const ROWS = {
  saude: [
    { label: "Última consulta", key: "ultima_consulta" },
    { label: "Vacinas em dia", key: "vacinas_em_dia" },
  ],
  educacao: [
    { label: "Escola", key: "escola" },
    { label: "Frequência", key: "frequencia_percent" },
  ],
  assistencia_social: [
    { label: "Cadastro Único", key: "cad_unico" },
    { label: "Benefício Ativo", key: "beneficio_ativo" },
  ],
};

const ALERT_TYPES = {
  saude: "Saúde",
  educacao: "Educação",
  assistencia_social: "Assistência Social",
};

export function AlertInfo({ type, child }: IAlertInfoProps) {
  const { alertas } = child[type] || {};

  function formatValue(value: any, row: any) {
    if (typeof value === "boolean") {
      return value ? "Sim" : "Não";
    } else if (
      typeof value === "string" &&
      value.match(/^\d{4}-\d{2}-\d{2}$/)
    ) {
      return value.split("-").reverse().join("/");
    } else if (!value) {
      return "Não informada";
    } else if (row.key === "frequencia_percent") {
      return `${value}%`;
    }
  }

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>{ALERT_TYPES[type]}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {child[type] ? (
          <>
            {ROWS[type].map((row) => {
              const value = (child[type] as any)[row.key];
              let formattedValue = formatValue(value, row);

              return (
                <Typography key={row.key} level="p">
                  <b>{row.label}: </b>
                  {formattedValue}
                </Typography>
              );
            })}

            {alertas && alertas.length > 0 && (
              <div className="mt-4 flex flex-col gap-2">
                <Typography level="p" weight="bold">
                  Alertas Ativos:
                </Typography>
                {alertas.map((alerta: string) => (
                  <Alert
                    key={alerta}
                    message={ALERT_LABELS[alerta as AlertKey]}
                    type="error"
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <Typography level="p" className="text-gray-400">
            Nenhuma informação de {ALERT_TYPES[type]} cadastrada.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
