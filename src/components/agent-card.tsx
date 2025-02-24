
import { Star } from "lucide-react";
import { Agent } from "@/types/agent";
import { cn } from "@/lib/utils";

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const integrationColors = {
    Easy: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Complex: "bg-red-100 text-red-800",
  };

  const licenseColors = {
    Free: "bg-green-100 text-green-800",
    Subscription: "bg-blue-100 text-blue-800",
    "One-time": "bg-purple-100 text-purple-800",
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="font-semibold leading-none tracking-tight">{agent.name}</h3>
          <p className="text-sm text-catalog-500">{agent.category}</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-catalog-100 px-2.5 py-0.5 text-xs font-medium text-catalog-800">
          ${agent.price.toFixed(2)}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-sm text-catalog-600 line-clamp-2">{agent.description}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
            integrationColors[agent.integrationLevel]
          )}
        >
          {agent.integrationLevel}
        </span>
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
            licenseColors[agent.license]
          )}
        >
          {agent.license}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
          <span className="text-sm font-medium">{agent.rating.toFixed(1)}</span>
        </div>
        <button className="rounded-full bg-catalog-900 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-catalog-800">
          View Details
        </button>
      </div>
    </div>
  );
}
