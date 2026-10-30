import { Image } from 'expo-image';
import { View } from 'react-native';

const MARK = require('../../assets/images/diaspora-tribe-mark.png');

/**
 * The Diaspora Tribe mark. Its cream band blends on cream, so by default it
 * sits on a white medallion for contrast.
 */
export function Logo({ size = 96, plate = true }: { size?: number; plate?: boolean }) {
  const pad = plate ? size * 0.1 : 0;
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: plate ? '#FFFFFF' : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        padding: pad,
      }}
    >
      <Image source={MARK} style={{ width: size - pad * 2, height: size - pad * 2 }} contentFit="contain" />
    </View>
  );
}
