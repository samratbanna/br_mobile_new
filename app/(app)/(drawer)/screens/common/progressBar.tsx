import {Box} from '~/components/ui/box';
import React from 'react';
import * as Progress from 'react-native-progress';
import {CircleCheck} from 'lucide-react-native';

export default function ProgressBar({percent, colorScheme}: any) {
  return (
    <Box className={`h-[10px] w-[100%] rounded-full bg-lightBlue`}>
      <Box
        className="h-[10px] rounded-full bg-blue"
        style={{width: percent ? `${percent}%` : '0%'}}></Box>
    </Box>
  );
}

export const CircularProgressBar = ({
  size,
  thickness,
  color,
  value1,
  value2,
  customStyle,
  status
}: any) => {

  return (
    <Box>
      {(value1 / value2) == 1 || status == "done" ? (
        <CircleCheck size={size-20} color={'#21C545'} />
      ) : (
        <Progress.Circle
          size={size}
          thickness={thickness}
          color={color}
          progress={value1 / value2}
          unfilledColor={'#E9E9EF'}
          borderColor="none"
          showsText={true}
          formatText={() => `${Number(value1).toFixed(1)}%`}
          textStyle={customStyle}
        />
      )}
    </Box>
  );
};
