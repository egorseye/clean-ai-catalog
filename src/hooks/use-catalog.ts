
import { useState } from "react";
import { Agent, FilterState } from "@/types/agent";

const MOCK_AGENTS: Agent[] = [
  {
    id: "1",
    name: "Marketing Assistant Pro",
    description: "Automate your marketing campaigns with AI-powered insights",
    category: "Marketing",
    price: 49.99,
    rating: 4.5,
    imageUrl: "/placeholder.svg",
    integrationLevel: "Easy",
    license: "Subscription",
  },
  {
    id: "2",
    name: "LogisticsMaster AI",
    description: "Optimize your supply chain with intelligent routing",
    category: "Logistics",
    price: 99.99,
    rating: 4.8,
    imageUrl: "/placeholder.svg",
    integrationLevel: "Complex",
    license: "Subscription",
  },
  {
    id: "3",
    name: "CustomerCare Bot",
    description: "24/7 customer support automation",
    category: "Customer Support",
    price: 29.99,
    rating: 4.2,
    imageUrl: "/placeholder.svg",
    integrationLevel: "Medium",
    license: "Free",
  },
  {
    id: "4",
    name: "Sales Pipeline AI",
    description: "Intelligent sales funnel optimization",
    category: "Sales",
    price: 79.99,
    rating: 4.6,
    imageUrl: "/placeholder.svg",
    integrationLevel: "Medium",
    license: "One-time",
  },
  {
    id: "5",
    name: "DataAnalyzer Pro",
    description: "Advanced data analysis and visualization",
    category: "Analytics",
    price: 149.99,
    rating: 4.9,
    imageUrl: "/placeholder.svg",
    integrationLevel: "Complex",
    license: "Subscription",
  },
  {
    id: "6",
    name: "Content Writer AI",
    description: "Generate engaging content automatically",
    category: "Marketing",
    price: 39.99,
    rating: 4.3,
    imageUrl: "/placeholder.svg",
    integrationLevel: "Easy",
    license: "Free",
  },
];

export const CATEGORIES = [
  { id: "marketing", name: "Marketing", count: 2 },
  { id: "logistics", name: "Logistics", count: 1 },
  { id: "customer-support", name: "Customer Support", count: 1 },
  { id: "sales", name: "Sales", count: 1 },
  { id: "analytics", name: "Analytics", count: 1 },
];

export const SORT_OPTIONS = [
  { label: "Most Popular", value: "popular" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Rating: High to Low", value: "rating_desc" },
];

const ITEMS_PER_PAGE = 6;

export function useCatalog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("popular");
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    price: [0, 1000],
    rating: 0,
    integration: [],
  });

  // Filter agents based on current filters
  const filteredAgents = MOCK_AGENTS.filter((agent) => {
    if (
      filters.search &&
      !agent.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !agent.description.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }
    if (filters.category && agent.category !== filters.category) {
      return false;
    }
    if (agent.price < filters.price[0] || agent.price > filters.price[1]) {
      return false;
    }
    if (filters.rating > 0 && agent.rating < filters.rating) {
      return false;
    }
    if (
      filters.integration.length > 0 &&
      !filters.integration.includes(agent.integrationLevel)
    ) {
      return false;
    }
    return true;
  });

  // Sort filtered agents
  const sortedAgents = [...filteredAgents].sort((a, b) => {
    switch (sortBy) {
      case "price_asc":
        return a.price - b.price;
      case "price_desc":
        return b.price - a.price;
      case "rating_desc":
        return b.rating - a.rating;
      case "newest":
        return parseInt(b.id) - parseInt(a.id);
      default:
        return b.rating - a.rating;
    }
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedAgents.length / ITEMS_PER_PAGE);
  const paginatedAgents = sortedAgents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return {
    agents: paginatedAgents,
    totalAgents: filteredAgents.length,
    currentPage,
    totalPages,
    sortBy,
    filters,
    setCurrentPage,
    setSortBy,
    setFilters,
  };
}
