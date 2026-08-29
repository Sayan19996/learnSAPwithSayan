"use client";

import { useEffect } from "react";
import { useHeaderStore } from "@/lib/store"; // Assuming a store exists or we can use a custom event

export default function ExitIntentPopup() {
  useEffect(() => {
    const handleMouseOut = (e: MouseEvent) => {
      // Check if mouse leaves the top of the window (intent to close tab or go to address bar)
      if (e.clientY <= 0) {
        // We use a custom event to tell the Header to open the modal
        // since the modal state is managed inside the Header component
        window.dispatchEvent(new CustomEvent("open-training-modal"));
      }
    };

    document.addEventListener("mouseleave", handleMouseOut);
    return () => document.removeEventListener("mouseleave", handleMouseOut);
  }, []);

  return null; // This component only handles logic
}
