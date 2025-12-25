import { Download, ExternalLink, AlertCircle, CheckCircle, Star } from "lucide-react";
import { useDeviceDetect } from "../hooks/useDeviceDetect";
import type { MinecraftVersion } from "../data/mockVersions";

interface DownloadMatrixProps {
  version: MinecraftVersion;
}

interface DownloadOption {
  type: string;
  label: string;
  link?: string;
  size?: string;
  notes: string;
  icon: React.ReactNode;
  recommended?: boolean;
  official?: boolean;
}

export function DownloadMatrix({ version }: DownloadMatrixProps) {
  const deviceInfo = useDeviceDetect();

  const downloadOptions: DownloadOption[] = [
    {
      type: "ch_play",
      label: "Google Play Store",
      link: version.downloadLinks.ch_play,
      size: version.fileSizes.ch_play,
      notes: "Link chính chủ từ Mojang. Tự động cập nhật.",
      icon: <ExternalLink className="w-5 h-5" />,
      official: true,
    },
    {
      type: "ios",
      label: "iOS (App Store)",
      link: version.downloadLinks.ios,
      size: version.fileSizes.ios,
      notes: "Dành cho iPhone/iPad. Yêu cầu iOS 13+",
      icon: <ExternalLink className="w-5 h-5" />,
      official: true,
    },
    {
      type: "windows",
      label: "Windows (Microsoft Store)",
      link: version.downloadLinks.windows,
      size: version.fileSizes.windows,
      notes: "Dành cho Windows 10/11. Hỗ trợ RTX.",
      icon: <ExternalLink className="w-5 h-5" />,
      official: true,
    },
    {
      type: "apk_original",
      label: "APK Original",
      link: version.downloadLinks.apk_original,
      size: version.fileSizes.apk_original,
      notes: "File gốc, không mod. Không thể đăng nhập Xbox Live.",
      icon: <Download className="w-5 h-5" />,
    },
    {
      type: "apk_xbox_patch",
      label: "APK Xbox Patch",
      link: version.downloadLinks.apk_xbox_patch,
      size: version.fileSizes.apk_xbox_patch,
      notes: "🌟 KHUYÊN DÙNG - Hỗ trợ Xbox Live để chơi Online với bạn bè.",
      icon: <Download className="w-5 h-5" />,
      recommended: true,
    },
    {
      type: "apk_xbox",
      label: "APK Xbox",
      link: version.downloadLinks.apk_xbox,
      size: version.fileSizes.apk_xbox,
      notes: "Dành riêng cho trải nghiệm Xbox hoặc emulator.",
      icon: <Download className="w-5 h-5" />,
    },
  ];

  // Filter only available options
  const availableOptions = downloadOptions.filter((option) => option.link);

  return (
    <div className="space-y-4">
      {/* Device Detection Banner */}
      {deviceInfo.platform !== "unknown" && (
        <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm">
                Chúng tôi phát hiện bạn đang dùng{" "}
                <span className="font-medium text-primary">
                  {deviceInfo.platform === "android" && "Android"}
                  {deviceInfo.platform === "ios" && "iOS"}
                  {deviceInfo.platform === "windows" && "Windows"}
                </span>
                . Lựa chọn được đề xuất đã được đánh dấu bên dưới.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Download Matrix Table - Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-border">
              <th className="text-left py-3 px-4">Loại file</th>
              <th className="text-left py-3 px-4">Dung lượng</th>
              <th className="text-left py-3 px-4">Ghi chú</th>
              <th className="text-right py-3 px-4">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {availableOptions.map((option, index) => {
              const isRecommended =
                option.recommended ||
                option.type === deviceInfo.recommendedDownload;

              return (
                <tr
                  key={option.type}
                  className={`
                    border-b border-border/50 hover:bg-card/50 transition-colors
                    ${isRecommended ? "bg-primary/5" : ""}
                  `}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`
                        p-2 rounded
                        ${option.official ? "bg-blue-500/20 text-blue-400" : ""}
                        ${isRecommended ? "bg-primary/20 text-primary" : ""}
                        ${!option.official && !isRecommended ? "bg-secondary text-secondary-foreground" : ""}
                      `}
                      >
                        {option.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{option.label}</span>
                          {option.official && (
                            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">
                              OFFICIAL
                            </span>
                          )}
                          {isRecommended && (
                            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded flex items-center gap-1">
                              <Star className="w-3 h-3 fill-current" />
                              ĐỀ XUẤT
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">
                    {option.size || "N/A"}
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground max-w-md">
                    {option.notes}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <a
                      href={option.link}
                      target={option.official ? "_blank" : undefined}
                      rel={option.official ? "noopener noreferrer" : undefined}
                      className={`
                        inline-flex items-center gap-2 px-4 py-2 rounded transition-all
                        ${
                          isRecommended
                            ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(65,178,75,0.3)]"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }
                      `}
                    >
                      {option.official ? (
                        <>
                          <ExternalLink className="w-4 h-4" />
                          Mở Store
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Tải xuống
                        </>
                      )}
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Download Matrix Cards - Mobile */}
      <div className="md:hidden space-y-3">
        {availableOptions.map((option) => {
          const isRecommended =
            option.recommended ||
            option.type === deviceInfo.recommendedDownload;

          return (
            <div
              key={option.type}
              className={`
                border rounded-lg p-4 space-y-3
                ${isRecommended ? "border-primary bg-primary/5" : "border-border bg-card"}
              `}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`
                    p-2 rounded flex-shrink-0
                    ${option.official ? "bg-blue-500/20 text-blue-400" : ""}
                    ${isRecommended ? "bg-primary/20 text-primary" : ""}
                    ${!option.official && !isRecommended ? "bg-secondary text-secondary-foreground" : ""}
                  `}
                >
                  {option.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-medium">{option.label}</span>
                    {option.official && (
                      <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">
                        OFFICIAL
                      </span>
                    )}
                    {isRecommended && (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        ĐỀ XUẤT
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {option.size}
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{option.notes}</p>

              <a
                href={option.link}
                target={option.official ? "_blank" : undefined}
                rel={option.official ? "noopener noreferrer" : undefined}
                className={`
                  flex items-center justify-center gap-2 w-full px-4 py-2 rounded transition-all
                  ${
                    isRecommended
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }
                `}
              >
                {option.official ? (
                  <>
                    <ExternalLink className="w-4 h-4" />
                    Mở Store
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Tải xuống
                  </>
                )}
              </a>
            </div>
          );
        })}
      </div>

      {/* Security Notice */}
      <div className="bg-secondary/50 border border-border rounded-lg p-4">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">
              <span className="text-foreground font-medium">Bảo mật:</span> Tất cả các file APK đều được quét virus bằng VirusTotal trước khi đăng tải.
            </p>
            <p>
              <span className="text-foreground font-medium">Lưu ý:</span> Để cài APK trên Android, bạn cần bật "Cài đặt từ nguồn không xác định" trong Settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
