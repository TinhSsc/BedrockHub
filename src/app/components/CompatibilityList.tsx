import { CheckCircle, XCircle } from "lucide-react";
import { AddonCard, type Addon } from "./AddonCard";
import type { MinecraftVersion } from "../data/mockVersions";
import { mockAddons } from "../data/mockAddons";

interface CompatibilityListProps {
  version: MinecraftVersion;
}

export function CompatibilityList({ version }: CompatibilityListProps) {
  // Filter addons that are compatible with this version
  const compatibleAddons = mockAddons.filter((addon) =>
    version.compatibleAddons.includes(addon.id)
  );

  if (compatibleAddons.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <XCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h4 className="mb-2">Chưa có Add-ons tương thích</h4>
        <p className="text-sm text-muted-foreground">
          Chúng tôi đang cập nhật danh sách add-ons tương thích với phiên bản này.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/20 rounded">
          <CheckCircle className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl">Add-ons & Maps tương thích</h3>
          <p className="text-sm text-muted-foreground">
            {compatibleAddons.length} add-ons đã được xác nhận hoạt động tốt trên v{version.version}
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground font-medium">Lưu ý:</span> Những add-ons này đã được kiểm tra và xác nhận hoạt động tốt trên phiên bản {version.version}. Nếu bạn gặp vấn đề, hãy kiểm tra xem bạn đã bật đủ các tùy chọn trong{" "}
          <span className="text-primary font-medium">Experimental Gameplay</span> chưa.
        </p>
      </div>

      {/* Addons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {compatibleAddons.map((addon) => (
          <AddonCard
            key={addon.id}
            addon={addon}
            onDownload={(addon) => {
              alert(`Tải xuống: ${addon.title}\nTương thích với: v${version.version}`);
            }}
            onInfo={(addon) => {
              console.log("View details:", addon);
            }}
          />
        ))}
      </div>
    </div>
  );
}
