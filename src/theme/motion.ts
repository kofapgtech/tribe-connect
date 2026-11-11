/**
 * Motion tokens — the single source of truth for timing and easing across the
 * app's animation layer. Mirrors the design-system motion spec:
 *
 *   micro  (120ms) — press / toggle feedback
 *   base   (220ms) — state change, cross-fade
 *   enter  (340ms) — screen + card entrance
 *   hero   (560ms) — reveal / confirm climax
 *
 * Easings:
 *   standard — decelerate, the default for most motion
 *   emphasis — gentle overshoot, for "delight" moments (springs, pops)
 *   exit     — accelerate, for things leaving the screen
 *
 * Values are plain numbers / Reanimated Easing functions so any animated
 * surface (Reanimated worklets, withTiming, layout animations) can share them.
 */
import { Easing } from 'react-native-reanimated';

/** Durations in milliseconds. */
export const duration = {
  micro: 120,
  base: 220,
  enter: 340,
  hero: 560,
} as const;

/** Reanimated easing curves (cubic-beziers from the motion spec). */
export const easing = {
  /** decelerate — most motion */
  standard: Easing.bezier(0.2, 0, 0, 1),
  /** overshoot — delight moments */
  emphasis: Easing.bezier(0.34, 1.56, 0.64, 1),
  /** accelerate — leaving */
  exit: Easing.bezier(0.4, 0, 1, 1),
} as const;

/** Entrance tuning shared by the screen + Rise primitives. */
export const entrance = {
  /** vertical travel for a rising element (px) */
  riseDistance: 12,
  /** delay added per stagger index (ms) */
  stagger: 55,
} as const;

export type Duration = keyof typeof duration;
export type EasingName = keyof typeof easing;
