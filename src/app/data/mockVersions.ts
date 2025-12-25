export interface MinecraftVersion {
  id: string;
  version: string;
  status: "stable" | "beta" | "preview";
  releaseDate: string;
  downloadLinks: {
    ch_play?: string;
    ios?: string;
    windows?: string;
    apk_original?: string;
    apk_xbox_patch?: string;
    apk_xbox?: string;
  };
  fileSizes: {
    ch_play?: string;
    ios?: string;
    windows?: string;
    apk_original?: string;
    apk_xbox_patch?: string;
    apk_xbox?: string;
  };
  changelog: {
    summary: string;
    newFeatures: string[];
    bugFixes: string[];
    technicalChanges: string[];
  };
  compatibleAddons: string[]; // IDs of compatible addons
  downloads: number;
  isLatest?: boolean;
}

export const mockVersions: MinecraftVersion[] = [
  {
    id: "1.21.131",
    version: "1.21.131",
    status: "stable",
    releaseDate: "2024-12-20",
    isLatest: true,
    downloads: 152400,
    downloadLinks: {
      ch_play: "https://play.google.com/store/apps/details?id=com.mojang.minecraftpe",
      ios: "https://apps.apple.com/app/minecraft/id479516143",
      windows: "https://www.microsoft.com/store/apps/9nblggh2jhxj",
      apk_original: "#download-original-1.21.131",
      apk_xbox_patch: "#download-xbox-patch-1.21.131",
      apk_xbox: "#download-xbox-1.21.131",
    },
    fileSizes: {
      ch_play: "Tùy thiết bị",
      ios: "~1.2 GB",
      windows: "~950 MB",
      apk_original: "650 MB",
      apk_xbox_patch: "652 MB",
      apk_xbox: "640 MB",
    },
    changelog: {
      summary: "Sửa lỗi liên quan đến Armadillo và Wind Charge, cải thiện hiệu suất cho thiết bị yếu.",
      newFeatures: [
        "Thêm hỗ trợ Experimental Features mới",
        "Cải thiện hiệu ứng particle cho Wind Charge",
        "Tối ưu render distance cho mobile",
      ],
      bugFixes: [
        "Sửa lỗi Armadillo không rơi scute khi bị brush",
        "Sửa crash khi sử dụng Wind Charge liên tục",
        "Sửa lỗi texture bị missing trên một số thiết bị Android",
      ],
      technicalChanges: [
        "Cập nhật Script API lên 1.8.0",
        "Thêm API mới cho custom entities",
        "Tối ưu memory usage",
      ],
    },
    compatibleAddons: ["1", "2", "4", "6", "8"],
  },
  {
    id: "1.21.130",
    version: "1.21.130",
    status: "stable",
    releaseDate: "2024-12-15",
    downloads: 98200,
    downloadLinks: {
      ch_play: "https://play.google.com/store/apps/details?id=com.mojang.minecraftpe",
      ios: "https://apps.apple.com/app/minecraft/id479516143",
      windows: "https://www.microsoft.com/store/apps/9nblggh2jhxj",
      apk_original: "#download-original-1.21.130",
      apk_xbox_patch: "#download-xbox-patch-1.21.130",
      apk_xbox: "#download-xbox-1.21.130",
    },
    fileSizes: {
      ch_play: "Tùy thiết bị",
      ios: "~1.2 GB",
      windows: "~945 MB",
      apk_original: "648 MB",
      apk_xbox_patch: "650 MB",
      apk_xbox: "638 MB",
    },
    changelog: {
      summary: "Cập nhật lớn với Bundle và Crafter, thêm nhiều block mới.",
      newFeatures: [
        "Thêm Bundle item (túi đựng đồ)",
        "Thêm Crafter block (tự động craft)",
        "Thêm Copper Bulb và Copper Door",
      ],
      bugFixes: [
        "Sửa lỗi multiplayer disconnect ngẫu nhiên",
        "Sửa lỗi Redstone circuit không hoạt động đúng",
        "Cải thiện chunk loading performance",
      ],
      technicalChanges: [
        "Cập nhật netcode cho multiplayer",
        "Thêm hỗ trợ custom crafting recipes",
      ],
    },
    compatibleAddons: ["1", "3", "5", "7"],
  },
  {
    id: "1.21.120",
    version: "1.21.120",
    status: "stable",
    releaseDate: "2024-12-05",
    downloads: 75300,
    downloadLinks: {
      ch_play: "https://play.google.com/store/apps/details?id=com.mojang.minecraftpe",
      ios: "https://apps.apple.com/app/minecraft/id479516143",
      apk_original: "#download-original-1.21.120",
      apk_xbox_patch: "#download-xbox-patch-1.21.120",
      apk_xbox: "#download-xbox-1.21.120",
    },
    fileSizes: {
      ch_play: "Tùy thiết bị",
      ios: "~1.1 GB",
      apk_original: "645 MB",
      apk_xbox_patch: "647 MB",
      apk_xbox: "635 MB",
    },
    changelog: {
      summary: "Cập nhật nhỏ tập trung vào bug fixes và performance.",
      newFeatures: [
        "Thêm setting mới cho render distance",
        "Cải thiện UI cho touch controls",
      ],
      bugFixes: [
        "Sửa lỗi crash khi vào Nether",
        "Sửa lỗi sound không phát trên một số thiết bị",
        "Sửa lỗi skin không load đúng",
      ],
      technicalChanges: [
        "Tối ưu asset loading",
        "Cải thiện battery usage",
      ],
    },
    compatibleAddons: ["1", "2", "3", "6"],
  },
  {
    id: "1.21.100",
    version: "1.21.100",
    status: "beta",
    releaseDate: "2024-11-28",
    downloads: 42100,
    downloadLinks: {
      apk_original: "#download-original-1.21.100",
      apk_xbox_patch: "#download-xbox-patch-1.21.100",
    },
    fileSizes: {
      apk_original: "643 MB",
      apk_xbox_patch: "645 MB",
    },
    changelog: {
      summary: "Phiên bản Beta - Thử nghiệm tính năng mới (có thể không ổn định).",
      newFeatures: [
        "Thử nghiệm Hard Core mode",
        "Thử nghiệm Spectator mode improvements",
      ],
      bugFixes: [
        "Sửa một số lỗi từ 1.21.130",
      ],
      technicalChanges: [
        "API changes cho addon developers",
      ],
    },
    compatibleAddons: ["1", "4"],
  },
  {
    id: "1.20.81",
    version: "1.20.81",
    status: "stable",
    releaseDate: "2024-11-15",
    downloads: 185000,
    downloadLinks: {
      ch_play: "https://play.google.com/store/apps/details?id=com.mojang.minecraftpe",
      ios: "https://apps.apple.com/app/minecraft/id479516143",
      apk_original: "#download-original-1.20.81",
      apk_xbox_patch: "#download-xbox-patch-1.20.81",
      apk_xbox: "#download-xbox-1.20.81",
    },
    fileSizes: {
      ch_play: "Tùy thiết bị",
      ios: "~1.0 GB",
      apk_original: "620 MB",
      apk_xbox_patch: "622 MB",
      apk_xbox: "615 MB",
    },
    changelog: {
      summary: "Phiên bản ổn định của 1.20, được nhiều người chơi yêu thích.",
      newFeatures: [
        "Cherry Blossom biome hoàn chỉnh",
        "Sniffer mob và các loại hạt giống mới",
        "Archaeology features",
      ],
      bugFixes: [
        "Sửa nhiều lỗi từ các bản trước",
        "Tối ưu performance tổng thể",
      ],
      technicalChanges: [
        "Stable API cho addon developers",
      ],
    },
    compatibleAddons: ["1", "2", "3", "5", "7", "8"],
  },
];
