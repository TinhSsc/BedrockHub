import { Shield, FlaskConical, Code } from "lucide-react";

interface StatusBadgeProps {
  type: "stable" | "experimental" | "script-api";
}

const badgeConfig = {
  stable: {
    label: "Stable",
    icon: Shield,
    className: "bg-green-500/20 text-green-400 border-green-500/30",
  },
  experimental: {
    label: "Experimental",
    icon: FlaskConical,
    className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  },
  "script-api": {
    label: "Script API",
    icon: Code,
    className: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  },
};

export function StatusBadge({ type }: StatusBadgeProps) {
  const config = badgeConfig[type];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-xs ${config.className}`}>
      <Icon className="w-3 h-3" />
      <span>{config.label}</span>
    </div>
  );
}
