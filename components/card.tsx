import React from 'react';
import { Box } from './ui/box';
import { cn } from '~/lib/utils';


type Props = {
  children?: React.ReactNode;
  customStyle?: string;
};

export const Card: React.FC<Props> = ({children , customStyle}) => {
  return (
    <Box className={cn("mt-2 p-3 rounded-xl border-[1px] border-border1 bg-white", customStyle)}>
      {children}
    </Box>
  );
};