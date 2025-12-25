import { useState } from "motion/react";
import { Smartphone, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface InstallationGuideProps {
  fileType: "apk_original" | "apk_xbox_patch" | "apk_xbox" | "ch_play" | "ios" | "windows";
}

const guides = {
  apk_original: {
    title: "Cài đặt APK Original",
    platform: "Android",
    steps: [
      {
        title: "Bước 1: Gỡ bản cũ (nếu có)",
        content: "Vào Settings → Apps → Minecraft → Uninstall. Điều này đảm bảo không xung đột với bản mới.",
        icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
      },
      {
        title: "Bước 2: Bật nguồn không xác định",
        content: "Settings → Security → Unknown Sources → Bật ON. Trên Android 8+: Settings → Apps & notifications → Advanced → Special app access → Install unknown apps → Chọn trình duyệt bạn dùng → Cho phép.",
        icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
      },
      {
        title: "Bước 3: Cài đặt file APK",
        content: "Mở file APK vừa tải về → Nhấn Install → Chờ hoàn tất.",
        icon: <CheckCircle className="w-5 h-5 text-primary" />,
      },
      {
        title: "Lưu ý quan trọng",
        content: "Bản Original KHÔNG hỗ trợ đăng nhập Xbox Live. Bạn sẽ không thể chơi multiplayer với bạn bè trên realm hoặc server Xbox.",
        icon: <XCircle className="w-5 h-5 text-red-400" />,
      },
    ],
  },
  apk_xbox_patch: {
    title: "Cài đặt APK Xbox Patch",
    platform: "Android",
    steps: [
      {
        title: "Bước 1: Gỡ bản cũ hoàn toàn",
        content: "Vào Settings → Apps → Minecraft → Uninstall. QUAN TRỌNG: Phải gỡ sạch, nếu không sẽ gặp lỗi 'App not installed'.",
        icon: <AlertTriangle className="w-5 h-5 text-red-400" />,
      },
      {
        title: "Bước 2: Xóa dữ liệu cũ",
        content: "Dùng File Manager vào /Android/data/ và xóa thư mục com.mojang.minecraftpe (nếu có).",
        icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
      },
      {
        title: "Bước 3: Bật nguồn không xác định",
        content: "Settings → Security → Unknown Sources → Bật ON.",
        icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
      },
      {
        title: "Bước 4: Cài đặt APK",
        content: "Mở file APK → Install → Chờ hoàn tất.",
        icon: <CheckCircle className="w-5 h-5 text-primary" />,
      },
      {
        title: "Bước 5: Đăng nhập Xbox",
        content: "Mở game → Sign in with Microsoft → Nhập tài khoản Xbox Live. Nếu gặp lỗi, thử khởi động lại máy.",
        icon: <CheckCircle className="w-5 h-5 text-primary" />,
      },
    ],
  },
  apk_xbox: {
    title: "Cài đặt APK Xbox",
    platform: "Android / Emulator",
    steps: [
      {
        title: "Bước 1: Kiểm tra thiết bị",
        content: "Bản này dành cho các thiết bị có tích hợp Xbox hoặc emulator (BlueStacks, LDPlayer). Không khuyến nghị cho máy Android thông thường.",
        icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
      },
      {
        title: "Bước 2: Gỡ bản cũ",
        content: "Gỡ Minecraft cũ hoàn toàn.",
        icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
      },
      {
        title: "Bước 3: Cài đặt",
        content: "Cài APK như bình thường.",
        icon: <CheckCircle className="w-5 h-5 text-primary" />,
      },
    ],
  },
  ch_play: {
    title: "Tải từ Google Play",
    platform: "Android",
    steps: [
      {
        title: "Bước 1: Mở Google Play",
        content: "Nhấn vào nút tải để mở Google Play Store.",
        icon: <CheckCircle className="w-5 h-5 text-primary" />,
      },
      {
        title: "Bước 2: Tải về",
        content: "Nhấn Install/Update trên Play Store. Game sẽ tự động cập nhật.",
        icon: <CheckCircle className="w-5 h-5 text-primary" />,
      },
      {
        title: "Lợi ích",
        content: "Link chính chủ từ Mojang, tự động cập nhật, hỗ trợ Xbox Live đầy đủ.",
        icon: <CheckCircle className="w-5 h-5 text-primary" />,
      },
    ],
  },
  ios: {
    title: "Tải từ App Store",
    platform: "iOS",
    steps: [
      {
        title: "Bước 1: Mở App Store",
        content: "Nhấn vào nút tải để mở App Store.",
        icon: <CheckCircle className="w-5 h-5 text-primary" />,
      },
      {
        title: "Bước 2: Tải về",
        content: "Nhấn Get/Update. Game có giá $6.99 USD (nếu chưa mua).",
        icon: <CheckCircle className="w-5 h-5 text-primary" />,
      },
      {
        title: "Yêu cầu",
        content: "iOS 13.0 trở lên, khoảng 1.2GB dung lượng trống.",
        icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
      },
    ],
  },
  windows: {
    title: "Tải từ Microsoft Store",
    platform: "Windows",
    steps: [
      {
        title: "Bước 1: Mở Microsoft Store",
        content: "Nhấn vào nút tải để mở Microsoft Store.",
        icon: <CheckCircle className="w-5 h-5 text-primary" />,
      },
      {
        title: "Bước 2: Tải về",
        content: "Nhấn Get/Install. Cần tài khoản Microsoft để tải.",
        icon: <CheckCircle className="w-5 h-5 text-primary" />,
      },
      {
        title: "Tính năng đặc biệt",
        content: "Phiên bản Windows hỗ trợ RTX (nếu có card đồ họa NVIDIA RTX).",
        icon: <CheckCircle className="w-5 h-5 text-primary" />,
      },
    ],
  },
};

export function InstallationGuide({ fileType }: InstallationGuideProps) {
  const guide = guides[fileType];

  if (!guide) return null;

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/20 rounded">
          <Smartphone className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl">{guide.title}</h3>
          <p className="text-sm text-muted-foreground">Nền tảng: {guide.platform}</p>
        </div>
      </div>

      <div className="space-y-4">
        {guide.steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              {step.icon}
            </div>
            <div>
              <h4 className="mb-1 text-sm">{step.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Warning for APK files */}
      {fileType.startsWith("apk") && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="mb-2">
                <span className="text-foreground font-medium">Lưu ý bảo mật:</span> Chỉ tải APK từ nguồn tin cậy. File đã được quét virus bằng VirusTotal.
              </p>
              <p>
                <span className="text-foreground font-medium">Khuyến nghị:</span> Nếu có thể, hãy dùng bản chính thức từ Google Play để được cập nhật tự động và an toàn hơn.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
