import { httpClient } from "@/lib/axios";
import type { StatisticsData } from "../types";

class StatisticsService {
  readonly #endpoint = "/complaint/overview";

  async getStatistics(): Promise<StatisticsData> {
    const response = await httpClient.get(this.#endpoint, {
      headers: { Accept: "application/json" },
    });

    const data = response.data.data;

    return {
      overview: {
        total_complaints: data.cards.total_complaints,
        pending_complaints: data.cards.pending_complaints,
        resolved_complaints: data.cards.resolved_complaints,
        new_complaints: data.cards.new_complaints,
      },
      line_chart: data.line_chart,
      pie_chart: data.pie_chart,
    };
  }
}

export default new StatisticsService();
