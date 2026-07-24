"use client";

import Link from "next/link";
import { ScanFace } from "lucide-react";
import styles from "./AiSkinAnalysis.module.css";

export default function AiSkinAnalysisLauncher() {
  return (
    <Link href="/musteri-paneli/ai-cilt-analizi" className={styles.launcher}>
      <ScanFace size={18} />
      AI Cilt Analizi
    </Link>
  );
}
