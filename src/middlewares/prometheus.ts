import { Application } from "express";
import promClient from "prom-client";
import prometheusMiddleware from "express-prometheus-middleware";

// Flag to avoid registering metrics multiple times
let metricsInitialized = false;

export const setupMonitoring = (app: Application) => {
  if (!metricsInitialized) {
    promClient.collectDefaultMetrics();
    metricsInitialized = true;
  }

  app.use(
    prometheusMiddleware({
      metricsPath: "/metrics",
      collectDefaultMetrics: false,
    })
  );
};
