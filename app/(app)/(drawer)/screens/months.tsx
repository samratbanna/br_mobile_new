import { useIsFocused } from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {Box} from '~/components/ui/box';
import {Text} from '~/components/ui/text';

export default function Months({
  currentMonthIndex,
  setCurrentMonthIndex,
  months,
  initialMonthIndex
}: any) {
  const flatListRef = useRef(null);
  const isFocused = useIsFocused()

  useEffect(()=>{
    if(isFocused){
        setCurrentMonthIndex(initialMonthIndex)
    }
  },[isFocused])

  useEffect(() => {
    if (flatListRef.current) {
      // @ts-ignore
      flatListRef.current.scrollToIndex({
        index: currentMonthIndex,
        animated: true,
      });
    }
  }, [currentMonthIndex]);

  const handleMonthPress = (index: any) => {
    setCurrentMonthIndex(index);
    if (flatListRef.current) {
      // @ts-ignore
      flatListRef.current.scrollToIndex({index, animated: true});
    }
  };

  const renderItem = ({item, index, currentMonthIndex, onMonthPress}: any) => {
    const isCurrentMonth = index === currentMonthIndex;

    return (
      <TouchableOpacity
        className={`mr-4 rounded-lg px-4 border-[1px] border-border1 py-2 ${isCurrentMonth ? 'bg-blue' : 'bg-white'}`}
        onPress={() => onMonthPress(index)}>
        <Text
          className={`text-lg font-normal ${isCurrentMonth ? 'text-white' : 'text-black'}`}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Box>
      <FlatList
        ref={flatListRef}
        data={months}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) =>
          renderItem({
            item,
            index,
            currentMonthIndex,
            onMonthPress: handleMonthPress,
          })
        }
        keyExtractor={item => item}
        getItemLayout={(data, index) => ({
          length: 80,
          offset: 80 * index,
          index,
        })}
      />
    </Box>
  );
}
