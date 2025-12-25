import { useState, useRef } from "react";
import { motion } from "motion/react";
import { Download, HardDrive, Info } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { RatingStars } from "./RatingStars";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface Addon {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  status: "stable" | "experimental" | "script-api";
  version: string;
  downloads: number;
  size: string;
  rating: number;
  reviews: number;
  author: string;
  ratingDetails?: {
    easyInstall: number;
    lowBugs: number;
    graphics: number;
  };
}

interface AddonCardProps {
  addon: Addon;
  onDownload?: (addon: Addon) => void;
  onInfo?: (addon: Addon) => void;
}

export function AddonCard({ addon, onDownload, onInfo }: AddonCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (videoRef.current && addon.videoUrl) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      className="group relative bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all hover:shadow-[0_0_20px_rgba(65,178,75,0.2)]"
      whileHover={{ y: -4 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail/Video Preview */}
      <div className="relative aspect-video bg-secondary overflow-hidden">
        {addon.videoUrl ? (
          <>
            <ImageWithFallback
              src={addon.thumbnail}
              alt={addon.title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isHovering ? "opacity-0" : "opacity-100"
              }`}
            />
            <video
              ref={videoRef}
              src={addon.videoUrl}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                isHovering ? "opacity-100" : "opacity-0"
              }`}
              muted
              loop
              playsInline
            />
          </>
        ) : (
          <ImageWithFallback
            src={addon.thumbnail}
            alt={addon.title}
            className="w-full h-full object-cover"
          />
        )}

        {/* Status Badge Overlay */}
        <div className="absolute top-2 left-2">
          <StatusBadge type={addon.status} />
        </div>

        {/* Download Count Overlay */}
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center gap-1">
          <Download className="w-3 h-3" />
          {addon.downloads >= 1000 
            ? `${(addon.downloads / 1000).toFixed(1)}K` 
            : addon.downloads}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title & Author */}
        <div>
          <h3 className="line-clamp-1 mb-1">{addon.title}</h3>
          <p className="text-xs text-muted-foreground">Bởi {addon.author}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">{addon.description}</p>

        {/* Rating */}
        <RatingStars 
          rating={addon.rating} 
          reviews={addon.reviews}
          showDetails={showDetails}
          details={addon.ratingDetails}
        />

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <HardDrive className="w-3 h-3" />
            <span>{addon.size}</span>
          </div>
          <div>v{addon.version}</div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => onDownload?.(addon)}
            className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Tải xuống
          </button>
          <button
            onClick={() => {
              setShowDetails(!showDetails);
              onInfo?.(addon);
            }}
            className="bg-secondary text-secondary-foreground px-4 py-2 rounded hover:bg-secondary/80 transition-colors"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-lg"
        style={{
          boxShadow: isHovering ? "inset 0 0 40px rgba(65, 178, 75, 0.1)" : "none",
        }}
      />
    </motion.div>
  );
}
