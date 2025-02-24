
import { FilterState } from "@/types/agent";
import { CATEGORIES } from "@/hooks/use-catalog";
import { Slider } from "@/components/ui/slider";
import { Star } from "lucide-react";

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  const handlePriceChange = (value: number[]) => {
    onChange({ ...filters, price: value as [number, number] });
  };

  const handleRatingChange = (value: number[]) => {
    onChange({ ...filters, rating: value[0] });
  };

  const handleIntegrationChange = (level: string) => {
    const current = filters.integration;
    const updated = current.includes(level)
      ? current.filter((l) => l !== level)
      : [...current, level];
    onChange({ ...filters, integration: updated });
  };

  return (
    <div className="w-64 space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Categories</h3>
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <label
              key={category.id}
              className="flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-catalog-50"
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  className="h-4 w-4 rounded border-catalog-300 text-catalog-600"
                  checked={filters.category === category.name}
                  onChange={() =>
                    onChange({ ...filters, category: category.name })
                  }
                />
                <span className="ml-2 text-sm">{category.name}</span>
              </div>
              <span className="text-xs text-catalog-400">{category.count}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Price Range</h3>
        <div className="px-2">
          <Slider
            defaultValue={[0, 1000]}
            max={1000}
            step={1}
            value={filters.price}
            onValueChange={handlePriceChange}
            className="mt-2"
          />
          <div className="mt-2 flex items-center justify-between text-sm text-catalog-600">
            <span>${filters.price[0]}</span>
            <span>${filters.price[1]}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Minimum Rating</h3>
        <div className="px-2">
          <Slider
            defaultValue={[0]}
            max={5}
            step={0.5}
            value={[filters.rating]}
            onValueChange={handleRatingChange}
            className="mt-2"
          />
          <div className="mt-2 flex items-center text-sm text-catalog-600">
            <Star className="mr-1 h-4 w-4 fill-yellow-400 stroke-yellow-400" />
            <span>{filters.rating}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Integration Level</h3>
        <div className="space-y-2">
          {["Easy", "Medium", "Complex"].map((level) => (
            <label
              key={level}
              className="flex cursor-pointer items-center rounded-lg p-2 hover:bg-catalog-50"
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-catalog-300 text-catalog-600"
                checked={filters.integration.includes(level)}
                onChange={() => handleIntegrationChange(level)}
              />
              <span className="ml-2 text-sm">{level}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
