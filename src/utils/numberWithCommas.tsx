import { roundToDecimals } from "strata-foundation-react-xnft";

export function numberWithCommas(x: number, decimals: number = 4): string {
  return roundToDecimals(x, decimals).toLocaleString("en-US", {
    maximumFractionDigits: decimals
  });
}
