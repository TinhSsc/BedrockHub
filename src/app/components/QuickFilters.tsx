import { TrendingUp, Shield, Clock } from "lucide-react";

interface QuickFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { id: "stable", label: "Bản ổn định nhất", icon: Shield },
  { id: "popular", label: "Nhiều người chơi nhất", icon: TrendingUp },
  { id: "new", label: "Mới cập nhật hôm nay", icon: Clock },
];

export function QuickFilters({ activeFilter, onFilterChange }: QuickFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center px-4 py-4">
      {filters.map((filter) => {
        const Icon = filter.icon;
        return (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full border transition-all
              ${activeFilter === filter.id
                ? 'bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(65,178,75,0.3)]'
                : 'bg-card border-border hover:border-primary/50 text-foreground'
              }
            `}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm">{filter.label}</span>
          </button>
        );
      })}
    </div>
  );
}
