import { Motif, cashOut } from 'src/types/cash-out';

// Sample motifs
const motifs: Motif[] = [
  { text: 'Notes de frais', value: 1 },
  { text: 'Utilities', value: 2 },
  { text: 'Achats & Prestataires', value: 3 },
];

// Function to generate random motif
const getRandomMotif = (): Motif => {
  return motifs[Math.floor(Math.random() * motifs.length)];
};

// Function to generate dummy cashOut data
const generateDummyCashOutData = (): cashOut[] => {
  const dummyData: cashOut[] = [];

  // Generate 10 dummy cashOut entries
  for (let i = 1; i <= 10; i++) {
    const motif: Motif = getRandomMotif();
    const cashOutEntry: cashOut = {
      id: Math.random().toString(36).substring(7),
      projectId: `Project_${i}`, // Example project ID
      amount: Math.floor(Math.random() * 10000), // Random amount between 0 and 10000
      startDate: new Date(`2022-01-${i < 10 ? '0' + i : i}`), // Example start date for each entry
      motif: motif.text, // Random motif from the motifs array
    };

    dummyData.push(cashOutEntry);
  }

  return dummyData;
};

// Generate dummy cashOut data
export const dummyCashOutData: cashOut[] = generateDummyCashOutData();
