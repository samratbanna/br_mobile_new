import * as React from 'react';
import {Button} from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import {Text} from '~/components/ui/text';
import {
  BottomSheet,
  BottomSheetBackdrop,
  BottomSheetContent,
  BottomSheetDragIndicator,
  BottomSheetItem,
  BottomSheetItemText,
  BottomSheetPortal,
} from './ui/bottom-sheet';
import {Box, Flex} from './ui/box';
import {Icon} from './navigation/TabBarIcon';
import {useRouter} from 'expo-router';
import {map} from 'lodash';
import {StudentRecordMenu} from '~/lib/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export function DialogExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-10">
          <Text>Dialog Example</Text>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>
              <Text>OK</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const MainMenuBottomSheet = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  function handleOnClick(type: string) {}

  return (
    <BottomSheet>
      {children}
      <BottomSheetPortal
        snapPoints={['70%', '100%']}
        backdropComponent={BottomSheetBackdrop}
        handleComponent={BottomSheetDragIndicator}
        style={{marginTop: insets.top}}
        backgroundStyle={{backgroundColor: '#F4F4FD'}}>
        <BottomSheetContent>
          <BottomSheetItem>
            <Flex className="bg-[#F4F4FD]">
              <Text className="font-semibold text-lg">Academic Overview</Text>
            </Flex>
          </BottomSheetItem>
        </BottomSheetContent>
        <BottomSheetContent>
          <Flex className="mx-2 rounded-lg">
            <Box className="w-full flex-row flex-wrap">
              <BottomSheetItem
                className="w-1/3 flex-col items-center justify-center"
                onPress={() => handleOnClick('exam')}>
                <Box className="h-[44px] w-[44px] items-center justify-center rounded-full border-[0.5px] border-border2">
                  <Icon icon="exam" size={28} imgMode="contain" />
                </Box>
                <BottomSheetItemText className="font-medium text-sm color-[#3C3C3C]">
                  Exam
                </BottomSheetItemText>
              </BottomSheetItem>
              <BottomSheetItem
                className="w-1/3 flex-col items-center justify-center"
                onPress={() => handleOnClick('homework')}>
                <Box className="h-[44px] w-[44px] items-center justify-center rounded-full border-[0.5px] border-border2">
                  <Icon icon="homework" size={28} imgMode="contain" />
                </Box>
                <BottomSheetItemText className="font-medium text-sm color-[#3C3C3C]">
                  Homework
                </BottomSheetItemText>
              </BottomSheetItem>
              <BottomSheetItem
                className="w-1/3 flex-col items-center justify-center"
                onPress={() => handleOnClick('syllabus')}>
                <Box className="h-[44px] w-[44px] items-center justify-center rounded-full border-[0.5px] border-border2">
                  <Icon icon="syllabus" size={28} imgMode="contain" />
                </Box>
                <BottomSheetItemText className="font-medium text-sm color-[#3C3C3C]">
                  Syllabus
                </BottomSheetItemText>
              </BottomSheetItem>
              <BottomSheetItem
                className="w-1/3 flex-col items-center justify-center"
                onPress={() => handleOnClick('timetable')}>
                <Box className="h-[44px] w-[44px] items-center justify-center rounded-full border-[0.5px] border-border2">
                  <Icon icon="timetable" size={28} imgMode="contain" />
                </Box>
                <BottomSheetItemText className="font-medium text-sm color-[#3C3C3C]">
                  Timetable
                </BottomSheetItemText>
              </BottomSheetItem>
            </Box>
          </Flex>
        </BottomSheetContent>

        <BottomSheetContent className="p-3">
          <Text className="font-semibold text-lg">Student Records</Text>
        </BottomSheetContent>
        <BottomSheetContent>
          <Flex className="mx-2 rounded-lg">
            <Box className="w-full flex-row flex-wrap">
              {map(StudentRecordMenu, menu => {
                let show =
                  menu.name == 'attendanceFeature' ||
                  menu.name == 'leaveApplicationFeature' ||
                  menu.name == 'feedbackFeature' ||
                  menu.name == 'attendanceFeature' ||
                  menu.name == 'reportCardFeature' ||
                  menu.name == 'copyCheckingFeature'
                    ? true
                    : false;
                return show ? (
                  <BottomSheetItem
                    className="w-1/3 flex-col items-center justify-center"
                    onPress={() => router.navigate(menu.route)}
                    key={menu.title}>
                    <Box
                      key={menu.title}
                      className="h-[44px] w-[44px] items-center justify-center rounded-full border-[0.5px] border-border2 text-center">
                      <Icon icon={menu.icon} size={28} imgMode="contain" />
                    </Box>
                    <BottomSheetItemText className="text-center font-medium text-sm color-[#3C3C3C]">
                      {menu.title}
                    </BottomSheetItemText>
                  </BottomSheetItem>
                ) : null;
              })}
            </Box>
          </Flex>
        </BottomSheetContent>
        <>
          <BottomSheetContent className="p-3">
            <Text className="font-semibold text-lg">School Facilities</Text>
          </BottomSheetContent>
          <BottomSheetContent>
            <Flex className="mx-2 rounded-lg">
              <Box className="w-full flex-row flex-wrap">
                <BottomSheetItem
                  className="w-1/3 flex-col items-center justify-center"
                  onPress={() => handleOnClick('event')}>
                  <Box className="h-[44px] w-[44px] items-center justify-center rounded-full border-[0.5px] border-border2">
                    <Icon icon="events" size={23} imgMode="contain" />
                  </Box>
                  <BottomSheetItemText className="text-center font-medium text-sm color-[#3C3C3C]">
                    Events
                  </BottomSheetItemText>
                </BottomSheetItem>
                <BottomSheetItem
                  onPress={() => handleOnClick('fees')}
                  className="w-1/3 flex-col items-center justify-center">
                  <Box className="h-[44px] w-[44px] items-center justify-center rounded-full border-[0.5px] border-border2">
                    <Icon icon="fees" size={28} imgMode="contain" />
                  </Box>
                  <BottomSheetItemText className="font-medium text-sm color-[#3C3C3C]">
                    Fees Overview
                  </BottomSheetItemText>
                </BottomSheetItem>
                <BottomSheetItem
                  className="w-1/3 flex-col items-center justify-center"
                  onPress={() => handleOnClick('transport')}>
                  <Box className="h-[44px] w-[44px] items-center justify-center rounded-full border-[0.5px] border-border2">
                    <Icon icon="transport" size={28} imgMode="contain" />
                  </Box>
                  <BottomSheetItemText className="font-medium text-sm color-[#3C3C3C]">
                    Transport
                  </BottomSheetItemText>
                </BottomSheetItem>
                <BottomSheetItem
                  className="w-1/3 flex-col items-center justify-center"
                  onPress={() => handleOnClick('library')}>
                  <Box className="h-[44px] w-[44px] items-center justify-center rounded-full border-[0.5px] border-border2">
                    <Icon icon="library" size={24} imgMode="contain" />
                  </Box>
                  <BottomSheetItemText className="font-medium text-sm color-[#3C3C3C]">
                    Library
                  </BottomSheetItemText>
                </BottomSheetItem>
              </Box>
            </Flex>
          </BottomSheetContent>
        </>
      </BottomSheetPortal>
    </BottomSheet>
  );
};
