import React from 'react';
import {Box} from '~/components/ui/box';
import {useSessionContext} from '~/providers/session/ctx';
import {useRouter} from 'expo-router';

export default function PdfScreen() {
  return <PdfList />;
}

export const PdfList = () => {
  const {user} = useSessionContext();
  return (
    <Box className={'flex-1 p-5'}>
      
    </Box>
  );
};
