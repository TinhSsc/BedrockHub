import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  reviews?: number;
  showDetails?: boolean;
  details?: {
    easyInstall: number;
    lowBugs: number;
    graphics: number;
  };
}

export function RatingStars({ rating, reviews, showDetails, details }: RatingStarsProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-transparent text-gray-600"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {rating.toFixed(1)}
        </span>
        {reviews && (
          <span className="text-xs text-muted-foreground">
            ({reviews.toLocaleString()} đánh giá)
          </span>
        )}
      </div>

      {showDetails && details && (
        <div className="text-xs space-y-1 text-muted-foreground">
          <div className="flex items-center justify-between gap-2">
            <span>Dễ cài đặt:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3 h-3 ${
                    star <= details.easyInstall
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-transparent text-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span>Ít lỗi:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3 h-3 ${
                    star <= details.lowBugs
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-transparent text-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span>Đồ họa đẹp:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3 h-3 ${
                    star <= details.graphics
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-transparent text-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
