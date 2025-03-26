import { Application } from "express";
import promClient from "prom-client";
import prometheusMiddleware from "express-prometheus-middleware";

export const setupMonitoring = (app: Application) => {
  promClient.collectDefaultMetrics();
  app.use(prometheusMiddleware({ metricsPath: "/metrics" }));
};
