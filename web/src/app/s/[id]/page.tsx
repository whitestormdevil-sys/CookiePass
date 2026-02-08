import { ShareImportPage } from "@/components/share/ShareImportPage";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: "Shared Access",
    description: `Import shared website access securely via CookiePass. Share ID: ${id}`,
    robots: { index: false, follow: false },
  };
}

export default async function SharePage({ params }: PageProps) {
  const { id } = await params;
  return <ShareImportPage shareId={id} />;
}
