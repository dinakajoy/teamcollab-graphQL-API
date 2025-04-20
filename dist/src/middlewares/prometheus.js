"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMonitoring = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
const express_prometheus_middleware_1 = __importDefault(require("express-prometheus-middleware"));
// Flag to avoid registering metrics multiple times
let metricsInitialized = false;
const setupMonitoring = (app) => {
    if (!metricsInitialized) {
        prom_client_1.default.collectDefaultMetrics();
        metricsInitialized = true;
    }
    app.use((0, express_prometheus_middleware_1.default)({
        metricsPath: "/metrics",
        collectDefaultMetrics: false,
    }));
};
exports.setupMonitoring = setupMonitoring;
