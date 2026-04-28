import { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Badge,
  Button,
  Alert,
} from "@/components";
import { IChild } from "@/types";
import { formatDate } from "@/utils";
import { useChildren, useAuth } from "@/hooks";

interface IChildInfoProps {
  child: IChild;
}

export function ChildInfo({ child }: IChildInfoProps) {
  const { reviewChild } = useChildren();
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [childData, setChildData] = useState(child);
  const { token } = useAuth();

  const {
    id,
    nome,
    responsavel,
    bairro,
    data_nascimento,
    revisado,
    revisado_por,
    revisado_em,
  } = childData;

  const formattedBirthDate = formatDate(data_nascimento);
  const formattedRevisionDate = revisado_em ? formatDate(revisado_em) : null;

  const reviewed_label = revisado
    ? "Revisado pela Equipe"
    : "Pendente de Revisão";

  const handleReview = async () => {
    if (!token) return;
    const response = await reviewChild(id);
    if (response) {
      setChildData(response);
      setReviewSuccess(true);
    }
  };

  return (
    <Card className="p-4">
      <CardContent className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col gap-2">
          <Typography level="h1" weight="bold" color="text-vm-primary">
            {nome}
          </Typography>
          <Typography level="p" className="text-gray-600">
            <b>Responsável:</b> {responsavel} | <b>Bairro:</b> {bairro} |{" "}
            <b>Nascimento:</b> {formattedBirthDate}
          </Typography>
        </div>
        <div className="w-full mt-6 md:mt-0 flex flex-col justify-between items-center md:items-end  gap-2">
          <Badge
            variant={revisado ? "default" : "destructive"}
            className="text-sm px-4 py-2"
          >
            {reviewed_label}
          </Badge>
          {revisado && revisado_por && (
            <Typography level="p" className="text-xs text-gray-400 mt-1">
              Por: {revisado_por} em {formattedRevisionDate}
            </Typography>
          )}
          <Button
            onClick={handleReview}
            className="w-full md:w-fit mt-6 md:mt-0"
          >
            Registrar Revisão
          </Button>
        </div>
      </CardContent>
      {reviewSuccess && (
        <Alert message="Revisão registrada com sucesso!" type="success" />
      )}
    </Card>
  );
}
