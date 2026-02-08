"use client";

import { ShareDetails } from "@/components/dashboard/ShareDetails";
import { ImportLog } from "@/components/dashboard/ImportLog";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function ShareDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/shares">
          <Button variant="outline" size="sm">
            <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Shares
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Share Details
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View and manage this share
          </p>
        </div>
      </div>

      <ShareDetails shareId={params.id} />

      <Card>
        <ImportLog shareId={params.id} />
      </Card>
    </div>
  );
}