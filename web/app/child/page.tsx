"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Navbar,
  Footer,
  Typography,
  ChildInfo,
  AlertInfo,
  Button,
} from "@/components";
import { useChildren, useAuth } from "@/hooks";
import { IChild } from "@/types";
import { ALERT_LABELS } from "@/utils";

type AlertKey = keyof typeof ALERT_LABELS;

const CHILD_INFO_LABEL = "Informações da Criança";
const NOT_FOUND_LABEL = "Criança não encontrada";

export default function Child() {
  const { getChildById } = useChildren();
  const { token } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const [child, setChild] = useState<IChild | null>(null);

  useEffect(() => {
    async function handleData() {
      if (!id) return;
      const response = await getChildById(id);
      if (response) {
        console.log(response);
        setChild(response);
      }
    }
    if (token) {
      handleData();
    }
  }, [token, id]);

  return (
    <div className="bg-vm-background w-screen min-h-screen overflow-x-hidden flex flex-col">
      <Navbar />
      <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col items-center justify-start gap-10  pt-40 px-4 pb-20">
        <Button
          variant="link"
          onClick={() => router.push("/")}
          className="self-start"
        >
          Voltar
        </Button>
        <Typography
          level="h1"
          weight="bold"
          align="center"
          color="text-vm-primary"
        >
          {CHILD_INFO_LABEL}
        </Typography>
        {!child ? (
          <Typography level="h2">{NOT_FOUND_LABEL}</Typography>
        ) : (
          <div className="w-full flex flex-col gap-8">
            <ChildInfo child={child} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-stretch">
              <AlertInfo type="saude" child={child} />
              <AlertInfo type="educacao" child={child} />
              <AlertInfo type="assistencia_social" child={child} />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
