"use client";

import { useReportWebVitals } from "next/web-vitals";

export default function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    console.info("Web Vital:", metric.name, metric.value, metric.rating);

    if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
      const body = {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
        navigationType: metric.navigationType,
      };
      navigator.sendBeacon?.(
        process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT,
        JSON.stringify(body),
      );
    }
  });

  return null;
}
