interface LandedCostInputs {
  purchasePrice: number | null;
  usInlandTruckingCost: number | null;
  shippingCost: number | null;
  clearingCost: number | null;
  nigeriaInlandTruckingCost: number | null;
  fullTankCost: number;
}

/**
 * landed cost = purchase price + US inland trucking + shipping + clearing
 *               + Nigerian inland trucking + full-tank cost
 * Returns null when any required cost is still missing, so the UI can show
 * "incomplete" rather than a misleading partial total.
 */
export function computeLandedCost(inputs: LandedCostInputs): number | null {
  const {
    purchasePrice,
    usInlandTruckingCost,
    shippingCost,
    clearingCost,
    nigeriaInlandTruckingCost,
    fullTankCost,
  } = inputs;

  if (
    purchasePrice === null ||
    usInlandTruckingCost === null ||
    shippingCost === null ||
    clearingCost === null ||
    nigeriaInlandTruckingCost === null
  ) {
    return null;
  }

  return (
    purchasePrice +
    usInlandTruckingCost +
    shippingCost +
    clearingCost +
    nigeriaInlandTruckingCost +
    fullTankCost
  );
}

/** projected profit = doorstep price - landed cost */
export function computeProjectedProfit(
  doorstepPrice: number | null,
  landedCost: number | null,
): number | null {
  if (doorstepPrice === null || landedCost === null) return null;
  return doorstepPrice - landedCost;
}
