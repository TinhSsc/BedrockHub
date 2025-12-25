import { useState } from "react";
import { Search, Sparkles } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = "Tìm kiếm add-ons, maps..." }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto px-4">
      <div className={`
        relative transition-all duration-300
        ${isFocused ? 'scale-105' : 'scale-100'}
      `}>
        <div className={`
          relative bg-card border-2 rounded-full overflow-hidden transition-all
          ${isFocused 
            ? 'border-primary shadow-[0_0_30px_rgba(65,178,75,0.3)]' 
            : 'border-border hover:border-primary/50'
          }
        `}>
          <div className="flex items-center gap-3 px-6 py-4">
            <Search className={`w-5 h-5 transition-colors ${isFocused ? 'text-primary' : 'text-muted-foreground'}`} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
            />
            {query && (
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Tìm kiếm</span>
              </button>
            )}
          </div>
        </div>

        {/* AI Suggestion Hint */}
        {isFocused && !query && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg p-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Gợi ý thông minh</span>
            </div>
            <div className="space-y-1 text-xs">
              <button className="block w-full text-left hover:text-primary transition-colors">
                → Add-on mobs mới nhất cho phiên bản của bạn
              </button>
              <button className="block w-full text-left hover:text-primary transition-colors">
                → Map survival phổ biến nhất tuần này
              </button>
              <button className="block w-full text-left hover:text-primary transition-colors">
                → Texture pack HD tương thích
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
