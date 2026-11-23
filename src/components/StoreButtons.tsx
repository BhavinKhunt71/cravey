import React from "react";

export const APP_STORE_URL = "https://apps.apple.com/app/id6829174927";
export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.cravey.mealprep";

interface Props {
  className?: string;
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
}

export default function StoreButtons({ className = "", variant = "dark", size = "lg" }: Props) {
  const isDark = variant === "dark";
  const isLarge = size === "lg";
  const isSmall = size === "sm";

  return (
    <div className={`flex flex-wrap items-center justify-center gap-3.5 ${className}`}>
      {/* App Store Button */}
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-3 ${
          isSmall ? "px-3.5 py-2 rounded-xl" : "px-5 py-3 rounded-2xl"
        } transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] ${
          isDark
            ? "bg-[#0F1012] text-white hover:bg-[#27272A] border border-[#27272A]"
            : "bg-white text-[#0F1012] hover:bg-[#F4F4F0] border border-[#EAEAE6]"
        }`}
      >
        {/* Apple SVG Icon */}
        <svg
          className={`${isLarge ? "w-6 h-6" : isSmall ? "w-4 h-4" : "w-5 h-5"} fill-current shrink-0`}
          viewBox="0 0 170 170"
        >
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.7-7.98-12.04-14.7-6.07-9.5-10.74-19.9-14.01-31.18-3.27-11.28-4.91-22.12-4.91-32.53 0-14.08 3.58-25.75 10.74-35.01 7.16-9.26 16.27-13.98 27.34-14.16 4.79 0 10.37 1.25 16.74 3.75 6.38 2.5 10.28 3.75 11.72 3.75 1.14 0 5.17-1.33 12.09-3.99 6.92-2.67 12.79-3.88 17.61-3.64 13.52.73 24.31 5.76 32.36 15.09-11.89 7.21-17.7 17.15-17.43 29.83.27 9.87 4.08 18.06 11.44 24.57 7.36 6.51 16.03 10.15 26.01 10.92-2.18 6.54-4.82 13.25-7.91 20.14zM119.22 31.84c0-7.39 2.66-14.28 7.98-20.67 5.32-6.39 11.89-10.36 19.7-11.91.87 6.92-.81 13.62-5.04 20.11-4.23 6.49-10.37 10.66-18.42 12.51-.55-.04-1.3-.04-2.26 0-.82-.04-1.47-.04-1.96-.04z" />
        </svg>
        <div className="text-left">
          <div className="text-[9px] uppercase tracking-wider font-semibold opacity-80 leading-tight">
            Download on the
          </div>
          <div className={`${isLarge ? "text-base" : isSmall ? "text-xs" : "text-sm"} font-extrabold tracking-tight leading-tight`}>
            App Store
          </div>
        </div>
      </a>

      {/* Google Play Button */}
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-3 ${
          isSmall ? "px-3.5 py-2 rounded-xl" : "px-5 py-3 rounded-2xl"
        } transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] ${
          isDark
            ? "bg-[#0F1012] text-white hover:bg-[#27272A] border border-[#27272A]"
            : "bg-white text-[#0F1012] hover:bg-[#F4F4F0] border border-[#EAEAE6]"
        }`}
      >
        {/* Google Play Colorful Triangle SVG Icon */}
        <svg className={`${isLarge ? "w-6 h-6" : isSmall ? "w-4 h-4" : "w-5 h-5"} shrink-0`} viewBox="0 0 512 512">
          <path
            fill="#4285F4"
            d="M47.5 35.8c-3.1 3.4-4.9 8.3-4.9 14.7v411c0 6.4 1.8 11.3 4.9 14.7l.8.8L278 247.3v-4.7L48.3 35l-.8.8z"
          />
          <path
            fill="#FBBC04"
            d="M354.6 324.5l-76.6-77.2v-4.7l76.6-77.2.8.5 90.7 51.5c25.9 14.7 25.9 38.7 0 53.4l-90.7 53.2-.8.5z"
          />
          <path
            fill="#EA4335"
            d="M355.4 324l-77.4-76.7L47.5 476.2c8.5 9 22.5 10.1 38.3 1.2l269.6-153.4z"
          />
          <path
            fill="#34A853"
            d="M355.4 188L85.8 34.6C70 25.7 56 26.8 47.5 35.8L278 247.3l77.4-76.7z"
          />
        </svg>
        <div className="text-left">
          <div className="text-[9px] uppercase tracking-wider font-semibold opacity-80 leading-tight">
            Get it on
          </div>
          <div className={`${isLarge ? "text-base" : isSmall ? "text-xs" : "text-sm"} font-extrabold tracking-tight leading-tight`}>
            Google Play
          </div>
        </div>
      </a>
    </div>
  );
}
