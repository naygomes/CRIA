import { IChild } from "@/types";

export type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export interface IFindAllResponse {
  data: IChild[];
  meta: Pagination;
}

export interface IGetAlertSummary {
  health: number;
  education: number;
  socialAssistance: number;
  perNeighborhood: Record<string, number>;
}

export interface IGetSummaryResponse {
  childrenTotal: number;
  reviewedTotal: number;
  alerts: IGetAlertSummary;
}
