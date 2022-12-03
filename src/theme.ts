import { defineStyle, extendTheme } from '@chakra-ui/react';

export const customTheme = extendTheme({
  components: {
    Heading: defineStyle({
      fontWeight: 'semibold',
      color: 'gray.900',
    }),
    Text: defineStyle({
      color: 'gray.500',
    }),
  },
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  colors: {
    tableHeader: {
      100: '#f5f5f5',
    },
  },
});
