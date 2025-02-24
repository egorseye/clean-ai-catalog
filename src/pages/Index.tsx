
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCatalog, SORT_OPTIONS } from "@/hooks/use-catalog";
import { FilterSidebar } from "@/components/filter-sidebar";
import { AgentCard } from "@/components/agent-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Index() {
  const {
    agents,
    totalAgents,
    currentPage,
    totalPages,
    sortBy,
    filters,
    setCurrentPage,
    setSortBy,
    setFilters,
  } = useCatalog();

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: event.target.value });
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-catalog-50 px-4 py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-catalog-900 sm:text-5xl md:text-6xl">
            Catalog of AI Agents
          </h1>
          <p className="mt-3 text-lg text-catalog-600 sm:mx-auto sm:mt-5 sm:max-w-xl">
            Discover and integrate ready-to-use AI agents for your business needs
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-6 lg:flex-row">
          {/* Desktop Filters */}
          <div className="hidden lg:block">
            <FilterSidebar filters={filters} onChange={setFilters} />
          </div>

          {/* Mobile Filters */}
          <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
            <div className="lg:hidden">
              <div className="flex items-center gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-catalog-400" />
                  <Input
                    type="search"
                    placeholder="Search agents..."
                    className="w-full pl-9"
                    value={filters.search}
                    onChange={handleSearch}
                  />
                </div>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0"
                    onClick={() => setIsMobileFiltersOpen(true)}
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
              </div>
            </div>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <FilterSidebar filters={filters} onChange={setFilters} />
            </SheetContent>
          </Sheet>

          <div className="flex-1">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Desktop Search */}
              <div className="hidden lg:block relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-catalog-400" />
                <Input
                  type="search"
                  placeholder="Search agents..."
                  className="w-full pl-9"
                  value={filters.search}
                  onChange={handleSearch}
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-catalog-600">
                  Found {totalAgents} agents
                </span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {agents.length > 0 ? (
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {agents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      )
                    )}
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex h-[400px] items-center justify-center rounded-lg border-2 border-dashed">
                <p className="text-center text-catalog-600">
                  No agents found matching your criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
