"use client";

import { LAYOUT_STYLES } from "@/lib/layout-styles";

export default function Page() {
  return (
    <div className={LAYOUT_STYLES.pageContainer}>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <div className="text-6xl">😅</div>
          <h1 className="text-3xl font-bold">Screw Ups</h1>
          <p className="text-muted-foreground text-lg">
            Space reserved for Vibe Prophet...
          </p>
        </div>
      </div>
    </div>
  );
}
