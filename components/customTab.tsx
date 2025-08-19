import React, {FC, ReactNode} from 'react';
import { TouchableOpacity} from 'react-native';
import {Box} from '~/components/ui/box';
import {Text} from '~/components/ui/text';

type DataProps = {
  label: string;
  name: string;
  disabled?: boolean;
  renderWrapper: ReactNode;
};

type CustomTabProps = {
  onChange: (val: string) => void;
  activeTab: string;
  data: DataProps[];
  tab?: boolean;
  labelStyle? : any ,
};

const CustomTab: FC<CustomTabProps> = ({data, activeTab, onChange, tab , labelStyle}) => {
  return (
    <Box className='flex-1'>
      <Box className="flex-row bg-white items-center">
        {data.map(item => {
          return (
            <TouchableOpacity
              className={`items-center ${activeTab === item.name && 'border-b-2 border-b-blue'} h-14 justify-center`}
              onPress={() => onChange(item.name)}
              style = {{width : `${(100/(data.length))}%`}}
              key={item.name}>
              <Text
                className={`text-lg ${activeTab === item.name ? 'font-semibold' : 'font-medium'}`}
                style = {[labelStyle , {color  : activeTab === item.name ?'#0081F8' : labelStyle?.color ?? '#646464' }]}>
                {item.label}
                
              </Text>
            </TouchableOpacity>
          );
        })}
      </Box>
      <Box className='flex-1'>
        {data?.find(i => i?.name === activeTab)?.renderWrapper}
      </Box>
    </Box>
  );
};

export default CustomTab;
