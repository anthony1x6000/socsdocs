export type HeadingLevel = 1 | 2 | 3 | 4 | 5;

export const titleLevelStyle: Record<HeadingLevel, string> = {
  5: "text-4xl font-bold text-slate-900",
  4: "text-3xl font-semibold text-slate-800",
  3: "text-2xl font-medium text-slate-700",
  2: "text-xl font-medium text-slate-600",
  1: "text-lg font-normal text-slate-500",
};
