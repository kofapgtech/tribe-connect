import Svg, { Circle, Path } from 'react-native-svg';
import type { TribeArchetypeId } from '@/data/types';

/**
 * Bespoke line glyphs, one per tribe, for the reveal halo. Each is a simple
 * stroked symbol on a 48×48 grid in the tribe accent color:
 *   seeker    — a compass (discovery)
 *   griot     — an open book (story / heritage)
 *   maker     — a woven diamond (craft)
 *   nourisher — a bowl with steam (food / rest)
 *   connector — a linked network (people)
 */
function Glyph({ id, color, sw }: { id: TribeArchetypeId; color: string; sw: number }) {
  const stroke = { stroke: color, strokeWidth: sw, fill: 'none' as const, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (id) {
    case 'seeker':
      return (
        <>
          <Circle cx={24} cy={24} r={17} {...stroke} />
          <Path d="M24 13 L29.5 24 L24 35 L18.5 24 Z" {...stroke} />
          <Circle cx={24} cy={24} r={1.8} fill={color} />
        </>
      );
    case 'griot':
      return (
        <>
          <Path d="M24 15 C19 12 13 12 8.5 13.8 L8.5 34 C13 32.2 19 32.2 24 35" {...stroke} />
          <Path d="M24 15 C29 12 35 12 39.5 13.8 L39.5 34 C35 32.2 29 32.2 24 35" {...stroke} />
          <Path d="M24 15 L24 35" {...stroke} />
        </>
      );
    case 'maker':
      return (
        <>
          <Path d="M24 8.5 L39.5 24 L24 39.5 L8.5 24 Z" {...stroke} />
          <Path d="M16 16 L32 32 M32 16 L16 32" {...stroke} />
        </>
      );
    case 'nourisher':
      return (
        <>
          <Path d="M9 25 L39 25" {...stroke} />
          <Path d="M11 25 Q24 38 37 25" {...stroke} />
          <Path d="M20 20 Q23 16 20 12 M28 20 Q31 16 28 12" {...stroke} />
        </>
      );
    case 'connector':
      return (
        <>
          <Path d="M15 16 L33 16 M15 16 L24 34 M33 16 L24 34" {...stroke} />
          <Circle cx={15} cy={16} r={3.4} fill={color} />
          <Circle cx={33} cy={16} r={3.4} fill={color} />
          <Circle cx={24} cy={34} r={3.4} fill={color} />
        </>
      );
    default:
      return <Circle cx={24} cy={24} r={16} {...stroke} />;
  }
}

export function TribeGlyph({
  id,
  color,
  size = 80,
}: {
  id: TribeArchetypeId;
  color: string;
  size?: number;
}) {
  // strokeWidth is in viewBox units (48 grid); 2.2 renders as a clean line
  // weight at the ~80px halo size.
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Glyph id={id} color={color} sw={2.2} />
    </Svg>
  );
}
