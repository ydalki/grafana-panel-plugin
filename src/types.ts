export type ChartType = 'circle' | 'bar' | 'line';

export interface SimpleOptions {
  chartType: ChartType;
  chartColor: string;
  chartLabel: string;
  developedBy: string;
}
