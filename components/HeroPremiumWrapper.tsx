"use client";

import dynamic from "next/dynamic";
import React from "react";

const HeroPremiumDynamic = dynamic(() => import("./HeroPremium"), { ssr: false });

export default function HeroPremiumWrapper() {
  return <HeroPremiumDynamic />;
}
