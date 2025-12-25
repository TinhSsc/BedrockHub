import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Pickaxe, Search, TrendingUp, Clock, Shield } from "lucide-react";
import { VersionTable } from "./components/VersionTable";
import { VersionDetail } from "./components/VersionDetail";
import { mockVersions, type MinecraftVersion } from "./data/mockVersions";

function App() {
  const [selectedVersion, setSelectedVersion] = useState<MinecraftVersion | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "stable" | "beta" | "preview">("all");

  // Filter versions
  let filteredVersions = mockVersions;
  
  if (statusFilter !== "all") {
    filteredVersions = filteredVersions.filter((v) => v.status === statusFilter);
  }
  
  if (searchQuery) {
    filteredVersions = filteredVersions.filter((v) =>
      v.version.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const handleVersionClick = (version: MinecraftVersion) => {
    setSelectedVersion(version);
  };

  const handleCloseDetail = () => {
    setSelectedVersion(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="relative">
                <Pickaxe className="w-8 h-8 text-primary" />
                <motion.div
                  className="absolute -inset-2 bg-primary/20 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </div>
              <div>
                <h1 className="text-xl">The Bedrock Hub</h1>
                <p className="text-xs text-muted-foreground">
                  Kho lưu trữ phiên bản Minecraft Bedrock Edition
                </p>
              </div>
            </motion.div>

            <div className="hidden md:flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {mockVersions.length} phiên bản
              </span>
              <div className="w-px h-4 bg-border" />
              <span className="text-sm text-muted-foreground">
                Cập nhật hàng tuần
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
              scale: [1.2, 1, 1.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-5xl mb-4 bg-gradient-to-r from-primary via-green-400 to-primary bg-clip-text text-transparent">
              Tải Minecraft Bedrock
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tìm và tải xuống mọi phiên bản Minecraft Bedrock Edition - từ Beta đến Stable.
              <br />
              APK Original, APK Xbox Patch, Official Links - Tất cả đều có tại đây.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm phiên bản (VD: 1.21.131)..."
                className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
          >
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="text-2xl">{mockVersions.filter(v => v.status === "stable").length}</span>
              </div>
              <p className="text-sm text-muted-foreground">Bản Stable</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span className="text-2xl">{mockVersions.filter(v => v.status === "beta").length}</span>
              </div>
              <p className="text-sm text-muted-foreground">Bản Beta</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-2xl">100%</span>
              </div>
              <p className="text-sm text-muted-foreground">Quét Virus</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="container mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { id: "all", label: "Tất cả", count: mockVersions.length },
            { id: "stable", label: "Stable", count: mockVersions.filter(v => v.status === "stable").length },
            { id: "beta", label: "Beta", count: mockVersions.filter(v => v.status === "beta").length },
            { id: "preview", label: "Preview", count: mockVersions.filter(v => v.status === "preview").length },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setStatusFilter(filter.id as any)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg border transition-all
                ${
                  statusFilter === filter.id
                    ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(65,178,75,0.3)]"
                    : "bg-card border-border hover:border-primary/50"
                }
              `}
            >
              <span>{filter.label}</span>
              <span
                className={`
                  text-xs px-2 py-0.5 rounded-full
                  ${
                    statusFilter === filter.id
                      ? "bg-primary-foreground/20"
                      : "bg-secondary text-secondary-foreground"
                  }
                `}
              >
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Version Table */}
      <section className="container mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {filteredVersions.length > 0 ? (
            <VersionTable
              versions={filteredVersions}
              onVersionClick={handleVersionClick}
            />
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">Không tìm thấy phiên bản phù hợp</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                }}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          )}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Pickaxe className="w-6 h-6 text-primary" />
                <span>The Bedrock Hub</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Kho lưu trữ phiên bản Minecraft Bedrock đầy đủ và an toàn nhất.
              </p>
            </div>

            <div>
              <h4 className="mb-4">Tải xuống</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    APK Android
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    iOS App Store
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Windows Store
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Hướng dẫn cài đặt
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Báo link hỏng
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4">Cộng đồng</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Forum
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Add-ons & Maps
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 The Bedrock Hub. Không chính thức liên kết với Mojang hoặc Microsoft.</p>
            <p className="mt-2">
              Tất cả file APK đều được quét virus bằng VirusTotal. Tải về an toàn 100%.
            </p>
          </div>
        </div>
      </footer>

      {/* Version Detail Modal */}
      <AnimatePresence>
        {selectedVersion && (
          <VersionDetail
            version={selectedVersion}
            onClose={handleCloseDetail}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
