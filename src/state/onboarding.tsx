import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { categoriesForSelection } from '@/data';
import { computeTribe } from '@/data/tribes';
import type { InterestCategoryId, TribeArchetypeId, TribeReveal } from '@/data/types';

type OnboardingState = {
  selected: string[];
  isSelected: (subId: string) => boolean;
  toggle: (subId: string) => void;
  selectedCount: number;
  selectedCategories: InterestCategoryId[];
  countForCategory: (categoryId: InterestCategoryId) => number;
  reveal: () => TribeReveal;
  tribe: TribeReveal | null;
  reset: () => void;
};

const Ctx = createContext<OnboardingState | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [tribe, setTribe] = useState<TribeReveal | null>(null);

  const value = useMemo<OnboardingState>(() => {
    const selectedCategories = categoriesForSelection(selected);
    return {
      selected,
      isSelected: (subId) => selected.includes(subId),
      toggle: (subId) =>
        setSelected((prev) =>
          prev.includes(subId) ? prev.filter((x) => x !== subId) : [...prev, subId],
        ),
      selectedCount: selected.length,
      selectedCategories,
      countForCategory: (categoryId) =>
        selected.filter((id) => id.startsWith(`${categoryId}-`)).length,
      reveal: () => {
        const result = computeTribe(selected);
        setTribe(result);
        return result;
      },
      tribe,
      reset: () => {
        setSelected([]);
        setTribe(null);
      },
    };
  }, [selected, tribe]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useOnboarding(): OnboardingState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useOnboarding must be used within OnboardingProvider');
  return ctx;
}

/**
 * Revealed tribe id, or null if not yet revealed / called outside the
 * provider. Non-throwing on purpose: the theme reads this (useTheme) and
 * runs above OnboardingProvider in the root layout, where null is correct.
 */
export function useRevealedTribeId(): TribeArchetypeId | null {
  return useContext(Ctx)?.tribe?.archetype.id ?? null;
}
