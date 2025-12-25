import { useState, useEffect } from "react";

interface DeviceInfo {
  platform: "android" | "ios" | "windows" | "unknown";
  isXbox: boolean;
  recommendedDownload: string;
}

export function useDeviceDetect(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    platform: "unknown",
    isXbox: false,
    recommendedDownload: "apk_xbox_patch",
  });

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const platform = navigator.platform.toLowerCase();

    let detectedPlatform: "android" | "ios" | "windows" | "unknown" = "unknown";
    let isXbox = false;
    let recommendedDownload = "apk_xbox_patch";

    // Android detection
    if (/android/.test(userAgent)) {
      detectedPlatform = "android";
      recommendedDownload = "apk_xbox_patch"; // Khuyên dùng cho Android
    }
    // iOS detection
    else if (/iphone|ipad|ipod/.test(userAgent)) {
      detectedPlatform = "ios";
      recommendedDownload = "ios";
    }
    // Windows detection
    else if (/win/.test(platform)) {
      detectedPlatform = "windows";
      recommendedDownload = "windows";
    }

    // Xbox detection
    if (/xbox/.test(userAgent)) {
      isXbox = true;
      recommendedDownload = "apk_xbox";
    }

    setDeviceInfo({
      platform: detectedPlatform,
      isXbox,
      recommendedDownload,
    });
  }, []);

  return deviceInfo;
}
