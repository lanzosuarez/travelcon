import { Box, IconButton } from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';

export const CollapseSidebar = () => {
  return (
    <Box pos="relative" sx={{ svg: { w: '25px', h: '25px' } }}>
      <IconButton variant="ghost" aria-label="collapse-sidebar" icon={<RiMenuLine />} zIndex="docked" size="lg" />
    </Box>
  );
};
