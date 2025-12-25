import { Calendar, Download, TrendingUp, Circle } from "lucide-react";
import { motion } from "motion/react";
import type { MinecraftVersion } from "../data/mockVersions";

interface VersionTableProps {
  versions: MinecraftVersion[];
  onVersionClick: (version: MinecraftVersion) => void;
}

const statusConfig = {
  stable: {
    label: "Stable",
    color: "text-green-400",
    bg: "bg-green-500/20",
    border: "border-green-500/30",
  },
  beta: {
    label: "Beta",
    color: "text-yellow-400",
    bg: "bg-yellow-500/20",
    border: "border-yellow-500/30",
  },
  preview: {
    label: "Preview",
    color: "text-purple-400",
    bg: "bg-purple-500/20",
    border: "border-purple-500/30",
  },
};

export function VersionTable({ versions, onVersionClick }: VersionTableProps) {
  return (
    <div className="w-full">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-4">Phiên bản</th>
              <th className="text-left py-4 px-4">Loại</th>
              <th className="text-left py-4 px-4">Ngày phát hành</th>
              <th className="text-left py-4 px-4">Lượt tải</th>
              <th className="text-right py-4 px-4">Tải xuống nhanh</th>
            </tr>
          </thead>
          <tbody>
            {versions.map((version, index) => (
              <motion.tr
                key={version.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-border/50 hover:bg-card/50 cursor-pointer transition-colors group"
                onClick={() => onVersionClick(version)}
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    {version.isLatest && (
                      <motion.div
                        className="w-2 h-2 rounded-full bg-primary"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [1, 0.5, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                    )}
                    <span className="font-mono group-hover:text-primary transition-colors">
                      v{version.version}
                    </span>
                    {version.isLatest && (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                        MỚI NHẤT
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-xs ${
                      statusConfig[version.status].bg
                    } ${statusConfig[version.status].color} ${
                      statusConfig[version.status].border
                    }`}
                  >
                    <Circle className="w-2 h-2 fill-current" />
                    {statusConfig[version.status].label}
                  </span>
                </td>
                <td className="py-4 px-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(version.releaseDate).toLocaleDateString("vi-VN")}
                  </div>
                </td>
                <td className="py-4 px-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    {version.downloads.toLocaleString("vi-VN")}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-end gap-2">
                    {version.downloadLinks.apk_xbox_patch && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(version.downloadLinks.apk_xbox_patch, "_blank");
                        }}
                        className="p-2 bg-primary/20 text-primary rounded hover:bg-primary/30 transition-colors"
                        title="APK Xbox Patch (Khuyên dùng)"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                    {version.downloadLinks.ch_play && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(version.downloadLinks.ch_play, "_blank");
                        }}
                        className="p-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors"
                        title="Google Play"
                      >
                        <TrendingUp className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-3">
        {versions.map((version, index) => (
          <motion.div
            key={version.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onVersionClick(version)}
            className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {version.isLatest && (
                    <motion.div
                      className="w-2 h-2 rounded-full bg-primary"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.5, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  )}
                  <span className="font-mono">v{version.version}</span>
                </div>
                {version.isLatest && (
                  <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                    MỚI NHẤT
                  </span>
                )}
              </div>
              <span
                className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-xs ${
                  statusConfig[version.status].bg
                } ${statusConfig[version.status].color} ${
                  statusConfig[version.status].border
                }`}
              >
                <Circle className="w-2 h-2 fill-current" />
                {statusConfig[version.status].label}
              </span>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(version.releaseDate).toLocaleDateString("vi-VN")}
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                {version.downloads.toLocaleString("vi-VN")} lượt tải
              </div>
            </div>

            <div className="flex gap-2">
              {version.downloadLinks.apk_xbox_patch && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(version.downloadLinks.apk_xbox_patch, "_blank");
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  APK Xbox Patch
                </button>
              )}
              {version.downloadLinks.ch_play && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(version.downloadLinks.ch_play, "_blank");
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors"
                >
                  <TrendingUp className="w-4 h-4" />
                  CH Play
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
