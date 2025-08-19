import React from 'react';
import {Box} from '~/components/ui/box';
import {BoxLoader} from './commonLoader';
import {useWindowDimensions} from 'react-native';

export const NotificationLoader = () => {
  const {width} = useWindowDimensions();

  return [1, 2].map(index => (
    <Box key={index}>
      <BoxLoader height={25} width={(width * 40) / 100} />
      {[1, 2, 3].map(index => (
        <Box
          className="mx-1 my-4 rounded-xl border-[0.5px] border-border bg-background p-2"
          key={index}>
          <Box className="mb-4 flex-row items-center justify-between">
            <Box className="flex-row items-center">
              <BoxLoader
                height={50}
                width={50}
                customStyle={{borderRadius: 50, marginRight: 6}}
              />
              <Box className="ml-2">
                <BoxLoader
                  height={24}
                  width={100}
                  customStyle={{marginBottom: 8}}
                />
                <BoxLoader height={40} width={(width * 50) / 100} />
              </Box>
            </Box>
            <Box className="w-1/5">
              <BoxLoader height={22} customStyle={{marginBottom: 12}} />

              <Box className="justify-center rounded-full bg-lightBlue px-3 py-2">
                <BoxLoader height={12} />
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  ));
};
