import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 requests per window
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (_req, res, _next, options) => {
    res.status(options.statusCode).json({
      success: false,
      error: {
        status: 429,
        message: "Too many access attempts, please try again after 15 minutes",
      },
    });
  },
});

export default limiter;
