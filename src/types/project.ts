export interface Project {
  id: string;
  project_name: string;
  email?: string;
  amount: Number;
  totalSliceAmount: number;
  beneficiaries: string[];
  financial_backer: string[];
  created_at?: Date;
  updated_at?: Date;
}
