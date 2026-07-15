"use client";

import { Suspense } from "react";
import JobsPageClient from "./JobsPageClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading jobs...</div>}>
      <JobsPageClient />
    </Suspense>
  );
}