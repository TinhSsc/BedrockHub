import { useState } from "react";
import { ChevronDown, ChevronUp, Sparkles, Bug, Code } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { MinecraftVersion } from "../data/mockVersions";

interface ChangelogViewerProps {
  version: MinecraftVersion;
}

export function ChangelogViewer({ version }: ChangelogViewerProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>("features");

  const sections = [
    {
      id: "features",
      title: "Tính năng mới",
      icon: Sparkles,
      items: version.changelog.newFeatures,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      id: "bugfixes",
      title: "Sửa lỗi",
      icon: Bug,
      items: version.changelog.bugFixes,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      id: "technical",
      title: "Thay đổi kỹ thuật",
      icon: Code,
      items: version.changelog.technicalChanges,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
  ];

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="mb-2">Tóm tắt</h4>
        <p className="text-sm text-muted-foreground">
          {version.changelog.summary}
        </p>
      </div>

      {/* Expandable Sections */}
      <div className="space-y-2">
        {sections.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSection === section.id;

          return (
            <div key={section.id} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-card/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded ${section.bg}`}>
                    <Icon className={`w-5 h-5 ${section.color}`} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm">{section.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {section.items.length} mục
                    </p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-4 pb-4 border-t border-border">
                      <ul className="space-y-2 mt-4">
                        {section.items.map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${section.bg}`} />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
