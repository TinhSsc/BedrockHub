import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface Version {
  id: string;
  name: string;
  isLatest?: boolean;
  isStable?: boolean;
  players?: number;
}

const versions: Version[] = [
  { id: "1.21.50", name: "1.21.50", isLatest: true, isStable: true, players: 15420 },
  { id: "1.21.40", name: "1.21.40", isStable: true, players: 12350 },
  { id: "1.21.30", name: "1.21.30", isStable: true, players: 8200 },
  { id: "1.21.20", name: "1.21.20", isStable: true, players: 5800 },
  { id: "1.20.80", name: "1.20.80", isStable: true, players: 3200 },
  { id: "1.20.70", name: "1.20.70", players: 2100 },
  { id: "1.20.60", name: "1.20.60", players: 1500 },
  { id: "1.20.50", name: "1.20.50", players: 980 },
];

interface VersionSelectorProps {
  selectedVersion: string;
  onVersionChange: (version: string) => void;
}

export function VersionSelector({ selectedVersion, onVersionChange }: VersionSelectorProps) {
  return (
    <div className="w-full py-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl mb-2">Chọn Phiên Bản</h2>
        <p className="text-muted-foreground">Chọn phiên bản Minecraft Bedrock bạn đang chơi</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 max-w-7xl mx-auto px-4">
        {versions.map((version) => (
          <motion.button
            key={version.id}
            onClick={() => onVersionChange(version.id)}
            className={`
              relative p-4 rounded-lg border-2 transition-all
              ${selectedVersion === version.id 
                ? 'bg-primary/20 border-primary shadow-[0_0_20px_rgba(65,178,75,0.4)]' 
                : 'bg-card border-border hover:border-primary/50 hover:shadow-[0_0_10px_rgba(65,178,75,0.2)]'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {version.isLatest && (
              <motion.div
                className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
            )}
            
            <div className="space-y-1">
              <div className={selectedVersion === version.id ? "text-primary" : "text-foreground"}>
                {version.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {version.players?.toLocaleString()} người chơi
              </div>
            </div>
            
            {version.isLatest && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                Mới nhất
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
