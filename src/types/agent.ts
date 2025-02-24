
export type Agent = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  imageUrl: string;
  integrationLevel: "Easy" | "Medium" | "Complex";
  license: "Free" | "Subscription" | "One-time";
};

export type Category = {
  id: string;
  name: string;
  count: number;
};

export type SortOption = {
  label: string;
  value: string;
};

export type FilterState = {
  search: string;
  category: string;
  price: [number, number];
  rating: number;
  integration: string[];
};
