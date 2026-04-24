import {
  IChild,
  IFindAllResponse,
  IFindAllParams,
  IFindAllFilters,
} from "@/types";

export class InMemoryChildrenRepository {
  private children: IChild[];

  constructor(initialData: IChild[] = []) {
    this.children = initialData;
  }

  private applyFindAllFilters(
    children: IChild[],
    filters: IFindAllFilters,
  ): IChild[] {
    let result = children;

    if (filters.neighborhood) {
      result = result.filter(
        (child) =>
          child.bairro.toLowerCase() === filters.neighborhood!.toLowerCase(),
      );
    }

    if (filters.wasReviewed !== undefined) {
      result = result.filter((child) => child.revisado === filters.wasReviewed);
    }

    if (filters.hasAlerts !== undefined) {
      result = result.filter((child) => {
        const totalAlertas =
          (child.saude?.alertas?.length || 0) +
          (child.educacao?.alertas?.length || 0) +
          (child.assistencia_social?.alertas?.length || 0);

        return filters.hasAlerts ? totalAlertas > 0 : totalAlertas === 0;
      });
    }

    return result;
  }

  private paginateChildren(children: IChild[], page: number, limit: number) {
    const startIndex = (page - 1) * limit;
    const paginatedChildren = children.slice(startIndex, startIndex + limit);

    return paginatedChildren;
  }

  async findAll({
    filters,
    page = 1,
    limit = 10,
  }: IFindAllParams = {}): Promise<IFindAllResponse | null> {
    let result = [...this.children];

    if (filters) result = this.applyFindAllFilters(result, filters);
    const paginatedChildren = this.paginateChildren(result, page, limit);

    return {
      data: paginatedChildren,
      meta: {
        total: result.length,
        page,
        limit,
        totalPages: Math.ceil(result.length / limit),
      },
    };
  }

  async findById(id: string): Promise<IChild | null> {
    return this.children.find((child) => child.id === id) || null;
  }
}
