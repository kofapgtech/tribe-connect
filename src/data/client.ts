/**
 * Mock data client.
 *
 * Every repository call goes through `query` so the app behaves like it is
 * talking to a real backend (artificial latency, async, failable). When we
 * move to Supabase, we reimplement the repositories against the real client
 * and the screens — which only ever call repositories — stay untouched.
 */
const DEFAULT_MIN = 180;
const DEFAULT_MAX = 520;

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export async function query<T>(
  resolver: () => T,
  opts: { minMs?: number; maxMs?: number } = {},
): Promise<T> {
  const min = opts.minMs ?? DEFAULT_MIN;
  const max = opts.maxMs ?? DEFAULT_MAX;
  const latency = Math.round(min + Math.random() * (max - min));
  await wait(latency);
  return resolver();
}
