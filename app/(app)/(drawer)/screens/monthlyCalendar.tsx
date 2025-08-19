import React, {useEffect, useRef} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {Text} from '~/components/ui/text';
import moment from 'moment';

export default function MonthlyCalendar({dates, selectedDate, onDatePress}:any) {
  const flatListRef = useRef(null);

  const currentDateIndex = dates?.findIndex(
    (item:any) => item?.date === moment().format('YYYY-MM-DD'),
  );

  useEffect(() => {
    if (flatListRef.current && currentDateIndex !== -1) {
      // @ts-ignore
      flatListRef.current.scrollToIndex({
        index: currentDateIndex,
        animated: true,
      });
    }
  }, [currentDateIndex]);

  const renderItem = ({item}:any) => {
    const isSelected = item.date === selectedDate;

    return (
      <TouchableOpacity
        className={`border-border1 border-2 h-[50px] mr-3 items-center rounded-md px-4 ${
          isSelected ? 'bg-blue' : 'bg-white'
        }`}
        onPress={() => onDatePress(item.date)}>
        <Text className={`${isSelected ? 'text-white' : 'text-black'}`}>
          {moment(item?.date).format('DD')}
        </Text>
        <Text className={`${isSelected ? 'text-white' : 'text-black'}`}>
          {moment(item?.date).format('ddd').toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={dates}
      ref={flatListRef}
      horizontal={true}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      getItemLayout={(data, index) => ({
        length: 60,
        offset: 60 * index,
        index,
      })}
    />
  );
}
