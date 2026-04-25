import { IChild, Pagination } from "./index.js";

export interface IFindAllParams {
  filters?: IFindAllFilters;
  page?: number;
  limit?: number;
}
export interface IFindAllFilters {
  neighborhood?: string;
  hasAlerts?: boolean;
  wasReviewed?: boolean;
}

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
export interface IChildrenRepository {
  findAll(params?: IFindAllParams): Promise<IFindAllResponse | null>;
  findById(id: string): Promise<IChild | null>;
  getSummary(): Promise<IGetSummaryResponse | null>;
  review(id: string, technicalEmail: string): Promise<IChild | null>;
}
