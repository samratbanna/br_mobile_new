import React, {FC} from 'react';
import {Icon} from '~/components/navigation/TabBarIcon';
import {Box} from '~/components/ui/box';
import {Text} from '~/components/ui/text';

type emptyScreenProps = {
  icon: string;
  title: string;
  desc?: string;
  color? : string
};

const EmptyScreen: FC<emptyScreenProps> = ({icon, title, desc , color}) => {
  return (
    <Box className="flex-1 py-4 items-center justify-center ">
      <Box
        className={`${icon === 'bell' ? 'bg-lightBlue' : 'bg-white'} h-[150px] w-[150px] items-center justify-center rounded-full`}>
        <Icon icon={icon} size={100} imgMode="contain" color={color}/>
      </Box>
      <Text className="my-4 text-xl font-semibold text-lightGrey">{title}</Text>
      <Text className="mt-2 text-lg text-lightGrey">{desc}</Text>
    </Box>
  );
};

export default EmptyScreen;
