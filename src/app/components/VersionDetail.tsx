import { useState } from "react";
import { X, ArrowLeft, Download as DownloadIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { MinecraftVersion } from "../data/mockVersions";
import { DownloadMatrix } from "./DownloadMatrix";
import { ChangelogViewer } from "./ChangelogViewer";
import { InstallationGuide } from "./InstallationGuide";
import { CompatibilityList } from "./CompatibilityList";

interface VersionDetailProps {
  version: MinecraftVersion;
  onClose: () => void;
}

export function VersionDetail({ version, onClose }: VersionDetailProps) {
  const [activeTab, setActiveTab] = useState<"download" | "changelog" | "guide" | "compatibility">("download");
  const [selectedFileType, setSelectedFileType] = useState<"apk_original" | "apk_xbox_patch" | "apk_xbox" | "ch_play" | "ios" | "windows">("apk_xbox_patch");

  const tabs = [
    { id: "download", label: "Tải xuống", count: Object.keys(version.downloadLinks).length },
    { id: "changelog", label: "Thay đổi", count: version.changelog.newFeatures.length + version.changelog.bugFixes.length },
    { id: "guide", label: "Hướng dẫn" },
    { id: "compatibility", label: "Tương thích", count: version.compatibleAddons.length },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div className="min-h-screen px-4 py-8 flex items-start justify-center">
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-6xl bg-background border border-border rounded-lg shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-card border-b border-border p-6">
            <div className="flex items-start justify-between mb-4">
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Quay lại</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-secondary rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/20 rounded-lg">
                <DownloadIcon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-mono">Minecraft Bedrock v{version.version}</h2>
                  {version.isLatest && (
                    <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">
                      MỚI NHẤT
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>
                    Phát hành: {new Date(version.releaseDate).toLocaleDateString("vi-VN")}
                  </span>
                  <span>•</span>
                  <span>
                    {version.downloads.toLocaleString("vi-VN")} lượt tải
                  </span>
                  <span>•</span>
                  <span className="capitalize">{version.status}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-border bg-card">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`
                    flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap
                    ${
                      activeTab === tab.id
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`
                      text-xs px-2 py-0.5 rounded-full
                      ${
                        activeTab === tab.id
                          ? "bg-primary/20 text-primary"
                          : "bg-secondary text-secondary-foreground"
                      }
                    `}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === "download" && (
                <motion.div
                  key="download"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <DownloadMatrix version={version} />
                </motion.div>
              )}

              {activeTab === "changelog" && (
                <motion.div
                  key="changelog"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <ChangelogViewer version={version} />
                </motion.div>
              )}

              {activeTab === "guide" && (
                <motion.div
                  key="guide"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl mb-4">Chọn loại file để xem hướng dẫn</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {Object.keys(version.downloadLinks).map((type) => (
                        <button
                          key={type}
                          onClick={() => setSelectedFileType(type as any)}
                          className={`
                            px-4 py-2 rounded-lg border transition-all
                            ${
                              selectedFileType === type
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-card border-border hover:border-primary/50"
                            }
                          `}
                        >
                          {type === "ch_play" && "Google Play"}
                          {type === "ios" && "App Store"}
                          {type === "windows" && "Microsoft Store"}
                          {type === "apk_original" && "APK Original"}
                          {type === "apk_xbox_patch" && "APK Xbox Patch"}
                          {type === "apk_xbox" && "APK Xbox"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <InstallationGuide fileType={selectedFileType} />
                </motion.div>
              )}

              {activeTab === "compatibility" && (
                <motion.div
                  key="compatibility"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <CompatibilityList version={version} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
