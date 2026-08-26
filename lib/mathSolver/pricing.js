// Shared pricing/limit constants for the math solver's free-tier + day pass.
export const FREE_DAILY_LIMIT = Number(process.env.MATH_SOLVER_FREE_DAILY_LIMIT || 1);
export const DAYPASS_PRICE_DISPLAY = process.env.MATH_SOLVER_DAYPASS_PRICE_DISPLAY || "$0.99";
