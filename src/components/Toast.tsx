import { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import { Text } from './Text';
import { radius, useTheme } from '@/theme';

/** Tiny confirmation toast. Parent owns the message; show() auto-clears it. */
export function useToast() {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const show = useCallback((msg: string) => {
    setMessage(msg);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(null), 2200);
  }, []);
  return { message, show };
}

export function Toast({ message }: { message: string | null }) {
  const c = useTheme().colors;
  if (!message) return null;
  return (
    <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, bottom: 28, alignItems: 'center' }}>
      <View
        style={{
          maxWidth: 300,
          backgroundColor: c.surfaceSoft,
          borderWidth: 1,
          borderColor: c.accent,
          borderRadius: radius.md,
          paddingVertical: 11,
          paddingHorizontal: 16,
        }}
      >
        <Text variant="small" color={c.text} center>
          {message}
        </Text>
      </View>
    </View>
  );
}
