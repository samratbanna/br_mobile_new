import React, {useMemo, useState} from 'react';
import {Box} from '~/components/ui/box';
import useTailwindColors from '~/hooks/useThemeColorTailwind';
import _ from 'lodash';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {useWindowDimensions} from 'react-native';
import { TaskList } from './taskList';

export default () => {
  const colors = useTailwindColors();
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const [routes] = useState([
    {
      title: 'In Progress',
      key: 'inprogress',
    },
    {
      title: 'Pending',
      key: 'pending',
    },
    {
      title: 'Completed',
      key: 'completed',
    },
    {
      title: 'All',
      key: 'all',
    }
  ]);

  const renderScene = useMemo(
    () =>
      SceneMap({
        inprogress: () => <TaskList type={'IN_PROGRESS'} />,
        pending: () => <TaskList type={'PENDING'} />,
        completed: () => <TaskList type={'COMPLETED'} />,
        all: () => <TaskList type={''} />,
      }),
    [],
  );

  return (
    <Box className="flex-1 bg-white">
      <Box className="flex-1 bg-background">
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width, height: layout.height}}
          renderTabBar={props => (
            <TabBar
              {...props}
              style={{backgroundColor: 'white'}}
              indicatorStyle={{backgroundColor: colors?.blue}}
              activeColor={colors?.blue}
              inactiveColor="black"
              tabStyle={{width: 'auto'}}
            />
          )}
        />
      </Box>
    </Box>
  );
};
