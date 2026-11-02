import Svg, { Circle, Path } from 'react-native-svg';

type IconProps = { color: string; size?: number };

/** Single-weight line icons for the main-app tab bar (viewBox 0 0 24 24, no fill). */

export function TribeConnectIcon({ color, size = 23 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M12 3C7 8 17 8 12 13C7 18 17 18 12 21" strokeWidth={1.8} />
      <Path d="M6 12H18" strokeWidth={1.8} />
    </Svg>
  );
}

export function MyJourneyIcon({ color, size = 23 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M5 19L12 5L19 19" strokeWidth={1.9} />
      <Path d="M12 5V19" strokeWidth={1.9} />
    </Svg>
  );
}

export function MyTribeIcon({ color, size = 23 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M12 4L20 9L17 19L7 19L4 9Z" strokeWidth={1.8} />
      <Path d="M4 9H20" strokeWidth={1.8} />
    </Svg>
  );
}

export function ExchangeIcon({ color, size = 23 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx={12} cy={12} r={8} strokeWidth={1.8} />
      <Path d="M9 9L15 15M15 9L9 15" strokeWidth={1.8} />
    </Svg>
  );
}
