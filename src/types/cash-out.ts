export interface cashOut {
  id: string;
  projectId: string;
  amount: number;
  startDate: Date;
  motif: string;
}

export type Motif = {
  text: string;
  value: number;
};

export enum motifs {
  'note de frias' = 'Note de frias',
  utilities = 'Utilities',
  'suppliers & prestataires' = 'Suppliers & Prestataires',
}
