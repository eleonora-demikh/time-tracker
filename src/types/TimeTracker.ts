export interface SpentPerDay {
  date: string,
  hours: number,
}

export interface TimeTracker {
  spentTime: SpentPerDay[],
  note: string,
}