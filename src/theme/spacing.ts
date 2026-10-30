export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

export const layout = {
  maxContentWidth: 520,
  screenPadding: spacing.xl,
} as const;

/**
 * One shadow language for the whole app. A single, subtle elevation used by
 * cards — no per-component bespoke shadows. Kept gentle so it reads as depth
 * on the dark ink ground rather than a hard drop shadow.
 */
export const elevation = {
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 5,
  },
} as const;
