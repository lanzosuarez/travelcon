import { Box, HStack, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import { RiStarHalfSFill, RiStarSLine, RiStarSFill } from 'react-icons/ri';

const FilledStar = () => <RiStarSFill />;
const HalfFilledStar = () => <RiStarHalfSFill />;
const EmptyStar = () => <RiStarSLine />;

type StarType = 'full' | 'half' | 'empty';

const variantsSizes = {
  lg: { w: '20px', h: '20px' },
  normal: { w: '', h: '' },
} as const;

type SizeVariants = keyof typeof variantsSizes;

const Star: FC<{ variant: StarType; size: SizeVariants }> = ({ variant, size }) => {
  switch (variant) {
    case 'full':
      return (
        <Box
          as="span"
          sx={{
            svg: {
              ...variantsSizes[size],
              color: '#FF9519',
            },
          }}
        >
          <FilledStar />
        </Box>
      );
    case 'half':
      return (
        <Box
          as="span"
          sx={{
            svg: {
              ...variantsSizes[size],
              color: '#FF9519',
            },
          }}
        >
          <HalfFilledStar />
        </Box>
      );
    case 'empty':
      return (
        <Box
          as="span"
          sx={{
            svg: {
              ...variantsSizes[size],
              color: '#FF9519',
            },
          }}
        >
          <EmptyStar />
        </Box>
      );

    default:
      throw new Error('Invalid type');
  }
};

const getStarType = (minLimit: number, maxLimit: number, baseNum: number): StarType => {
  if ((baseNum > minLimit && baseNum === maxLimit) || baseNum > maxLimit) {
    return 'full';
  }

  if (baseNum > minLimit && baseNum < maxLimit) {
    return 'half';
  }

  return 'empty';
};

const fontSize = {
  normal: 'xs',
  lg: 'md',
};

export const Rating: FC<{ rating: number; size?: SizeVariants }> = ({ rating, size = 'normal' }) => {
  return (
    <HStack spacing="1.5">
      <Box>
        <Star size={size} variant={getStarType(0, 1, rating)} />
      </Box>
      <Box>
        <Star size={size} variant={getStarType(1, 2, rating)} />
      </Box>
      <Box>
        <Star size={size} variant={getStarType(2, 3, rating)} />
      </Box>
      <Box>
        <Star size={size} variant={getStarType(3, 4, rating)} />
      </Box>
      <Box>
        <Star size={size} variant={getStarType(4, 5, rating)} />
      </Box>
      <Text fontSize={fontSize[size]} color="gray">
        5.0
      </Text>
    </HStack>
  );
};

export default Rating;
