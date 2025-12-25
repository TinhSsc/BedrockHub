import { Addon } from "../components/AddonCard";

export const mockAddons: Addon[] = [
  {
    id: "1",
    title: "Smart Mobs AI Enhanced",
    description: "Mob AI thông minh hơn với hành vi tự nhiên, tấn công nhóm và khả năng học hỏi từ người chơi.",
    thumbnail: "https://images.unsplash.com/photo-1688637820628-a5f4b419d909?w=400",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    status: "stable",
    version: "1.21.50",
    downloads: 15420,
    size: "2.3 MB",
    rating: 4.8,
    reviews: 1250,
    author: "MineCraftVN",
    ratingDetails: {
      easyInstall: 5,
      lowBugs: 5,
      graphics: 4,
    },
  },
  {
    id: "2",
    title: "Ultra Realistic Texture Pack",
    description: "Texture pack HD với độ phân giải 512x, hỗ trợ RTX và shader tùy chỉnh.",
    thumbnail: "https://images.unsplash.com/photo-1665520937321-5388fb465942?w=400",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    status: "experimental",
    version: "1.21.50",
    downloads: 12350,
    size: "156 MB",
    rating: 4.6,
    reviews: 890,
    author: "RealisticGaming",
    ratingDetails: {
      easyInstall: 4,
      lowBugs: 4,
      graphics: 5,
    },
  },
  {
    id: "3",
    title: "Skyblock Survival Map",
    description: "Map skyblock với 50+ thử thách, hệ thống quest tự động và multiplayer support.",
    thumbnail: "https://images.unsplash.com/photo-1682647728951-feaf6b19b212?w=400",
    status: "stable",
    version: "1.21.40",
    downloads: 9800,
    size: "45 MB",
    rating: 4.9,
    reviews: 2100,
    author: "SkyBlockPro",
    ratingDetails: {
      easyInstall: 5,
      lowBugs: 5,
      graphics: 4,
    },
  },
  {
    id: "4",
    title: "Deep Dark Caves Expansion",
    description: "Mở rộng hệ thống hang động với biome mới, mob nguy hiểm và kho báu quý hiếm.",
    thumbnail: "https://images.unsplash.com/photo-1724388477932-7623e1f22c70?w=400",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    status: "script-api",
    version: "1.21.50",
    downloads: 7650,
    size: "18 MB",
    rating: 4.7,
    reviews: 650,
    author: "CaveExplorer",
    ratingDetails: {
      easyInstall: 3,
      lowBugs: 4,
      graphics: 5,
    },
  },
  {
    id: "5",
    title: "Dragons & Dungeons",
    description: "Thêm rồng bay,던geon khổng lồ và hệ thống boss fight epic vào game.",
    thumbnail: "https://images.unsplash.com/photo-1620062110593-4b3c37545aff?w=400",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    status: "experimental",
    version: "1.21.40",
    downloads: 11200,
    size: "67 MB",
    rating: 4.5,
    reviews: 1580,
    author: "FantasyWorld",
    ratingDetails: {
      easyInstall: 4,
      lowBugs: 3,
      graphics: 5,
    },
  },
  {
    id: "6",
    title: "Medieval Kingdom Builder",
    description: "Xây dựng vương quốc trung cổ với 200+ block mới, NPC và hệ thống kinh tế.",
    thumbnail: "https://images.unsplash.com/photo-1651606143736-99ea8846b0b3?w=400",
    status: "stable",
    version: "1.21.50",
    downloads: 8900,
    size: "34 MB",
    rating: 4.8,
    reviews: 920,
    author: "MedievalCraft",
    ratingDetails: {
      easyInstall: 5,
      lowBugs: 4,
      graphics: 5,
    },
  },
  {
    id: "7",
    title: "Furniture & Decoration Plus",
    description: "Hơn 300 món đồ nội thất và trang trí để làm nhà đẹp hơn bao giờ hết.",
    thumbnail: "https://images.unsplash.com/photo-1682647728951-feaf6b19b212?w=400",
    status: "stable",
    version: "1.21.30",
    downloads: 13400,
    size: "12 MB",
    rating: 4.9,
    reviews: 1850,
    author: "DecorMaster",
    ratingDetails: {
      easyInstall: 5,
      lowBugs: 5,
      graphics: 4,
    },
  },
  {
    id: "8",
    title: "Advanced Redstone Mechanics",
    description: "Thêm logic gates, sensors và automation tools cho những kỹ sư redstone.",
    thumbnail: "https://images.unsplash.com/photo-1688637820628-a5f4b419d909?w=400",
    status: "script-api",
    version: "1.21.50",
    downloads: 5600,
    size: "8.5 MB",
    rating: 4.6,
    reviews: 420,
    author: "RedstoneGenius",
    ratingDetails: {
      easyInstall: 3,
      lowBugs: 4,
      graphics: 3,
    },
  },
];

// Filter functions
export function filterByVersion(addons: Addon[], version: string): Addon[] {
  if (!version) return addons;
  return addons.filter(addon => addon.version === version);
}

export function filterByQuickFilter(addons: Addon[], filter: string): Addon[] {
  switch (filter) {
    case "stable":
      return addons.filter(addon => addon.status === "stable");
    case "popular":
      return [...addons].sort((a, b) => b.downloads - a.downloads);
    case "new":
      // Mock: just return sorted by downloads for demo
      return [...addons].sort((a, b) => b.downloads - a.downloads).slice(0, 4);
    default:
      return addons;
  }
}

export function searchAddons(addons: Addon[], query: string): Addon[] {
  if (!query) return addons;
  const lowerQuery = query.toLowerCase();
  return addons.filter(
    addon =>
      addon.title.toLowerCase().includes(lowerQuery) ||
      addon.description.toLowerCase().includes(lowerQuery) ||
      addon.author.toLowerCase().includes(lowerQuery)
  );
}
