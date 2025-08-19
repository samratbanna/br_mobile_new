import {filter, find, sumBy} from 'lodash';
import React, {useMemo} from 'react';
import Svg from 'react-native-svg';
import {Box} from '~/components/ui/box';
import {useSessionContext} from '~/providers/session/ctx';
import {getDashboardData, getTeamDashboardData, getTeamList} from '~/services';
import {VictoryPie} from 'victory-native';
import {Text} from '../ui/text';
import { LeadStatus } from '~/lib/constants';

export const Dashboard = () => {
  const {user} = useSessionContext();
  const {data: dashboardData, isLoading} = getDashboardData({
    staffId: user?._id,
  });
  const {data: teamList, isLoading: teamLoading} = getTeamList({
    staffId: user?._id,
  });
  const params = useMemo(() => {
    if (user?.role !== 'TRAINER') {
      if (user?.role === 'GROWTH_PARTNER') {
        return {growthPartnerId: user?._id};
      } else {
        return {teamLeaderId: user?._id};
      }
    } else {
      return {trainerId: user?._id};
    }
  }, [user]);

  const {data: teamDashBoardData, isLoading: loading} =
    getTeamDashboardData(params);
  console.log('teamDashBoardData', teamDashBoardData);

  const finalDashboardData = useMemo(() => {
    if (dashboardData) {
      const todayLead =
        sumBy(
          dashboardData.todayLead,
          (lead: {leadCount: any}) => lead.leadCount,
        ) ?? 0;
      const todayConverted = find(
        dashboardData.todayLead,
        (lead: {_id: boolean}) => lead._id === true,
      )?.leadCount ?? 0;
      const totalLead =
        sumBy(
          dashboardData.totalLead,
          (lead: {leadCount: any}) => lead.leadCount,
        ) ?? 0;
      const totalConverted =
        find(
          dashboardData.totalLead,
          (lead: {_id: boolean}) => lead._id === true,
        )?.leadCount ?? 0;
      const totalCommission =
        find(
          dashboardData.totalAmount,
          (lead: {_id: string}) => lead._id === 'CREDIT',
        )?.totalEarn ?? 0;
      const totalPaidCommission =
        find(
          dashboardData.totalAmount,
          (lead: {_id: string}) => lead._id === 'DEBIT',
        )?.totalEarn ?? 0;
      const todayCommission =
        find(
          dashboardData.todayTotalAmount,
          (lead: {_id: string}) => lead._id === 'CREDIT',
        )?.totalEarn ?? 0;
      const todayPaidCommission =
        find(
          dashboardData.todayTotalAmount,
          (lead: {_id: string}) => lead._id === 'DEBIT',
        )?.totalEarn ?? 0;
      const d = {
        todayLead,
        todayConverted,
        totalLead,
        totalConverted,
        totalCommission,
        todayCommission,
        totalPaidCommission,
        todayPaidCommission,
      };
      return d;
    } else {
      return {
        todayLead: 0,
        todayConverted: 0,
        totalLead: 0,
        totalConverted: 0,
        totalCommission: 0,
        todayCommission: 0,
        totalPaidCommission: 0,
        todayPaidCommission: 0,
      };
    }
  }, [dashboardData]);
  console.log('finalDashboardData', finalDashboardData);

  //team final report
  const teamFinalReport = React.useMemo(() => {
    if (teamDashBoardData) {
      const TotalLead = sumBy(teamDashBoardData, team => team.count);
      console.log('TotalLead', TotalLead);
      
      const InBucket = sumBy(
        filter(teamDashBoardData, data => data?.status === 'PENDING'),
        team => team.count,
      );
      const converted = sumBy(
        filter(
          teamDashBoardData,
          data => data?.status === LeadStatus?.CONVERTED,
        ),
        team => team.count,
      );
      const followup = sumBy(
        filter(
          teamDashBoardData,
          data =>
            data?.status === LeadStatus.LOW_FOLLOW_UP ||
            data?.status === LeadStatus.MED_FOLLOW_UP ||
            data?.status === LeadStatus?.HIGH_FOLLOW_UP ||
            data?.status === LeadStatus?.RINGING ||
            data?.status === LeadStatus?.NON_CONTACTABLE,
        ),
        team => team.count,
      );
      const meeting = sumBy(
        filter(
          teamDashBoardData,
          data =>
            data?.status === LeadStatus.MEETING_SCHEDULED ||
            data?.status === LeadStatus.DEMO_SCHEDULED,
        ),
        team => team.count,
      );
      const rejected = sumBy(
        filter(
          teamDashBoardData,
          data =>
            data?.status === LeadStatus.WRONG_NUMBER ||
            data?.status === LeadStatus.REJECTED ||
            data?.status === LeadStatus.DUPLICATE ||
            data?.status === LeadStatus.NON_CONTACTABLE,
        ),
        team => team.count,
      );
      return {
        total: TotalLead,
        bucket: InBucket,
        followup,
        meeting,
        rejected,
        converted,
      };
    }
  }, [teamDashBoardData]);
  console.log('teamFinalReport', teamFinalReport);
  

  return (
    <Box className="flex-1 pb-20">
      <Text className="mt-5 font-semibold text-xl">Today Overview</Text>
      <Box className="mt-2 rounded-xl border-[1px] border-border1 bg-white">
        <Box className="flex-row items-center">
          <TodayLeadGraph
            total={finalDashboardData?.todayLead}
            converted={finalDashboardData?.todayConverted}
          />
          <Box>
            <Box className="h-2 w-8 rounded-full bg-[#CCCCCC]" />
            <Text className="mt-1 text-sm text-graniteGray">Total Lead</Text>
            <Text className="font-semibold text-xl">{`${finalDashboardData?.todayLead}`}</Text>
            <Box className="mt-4 h-2 w-8 rounded-full bg-[#4CAF50]" />
            <Text className="mt-1 text-sm text-graniteGray">
              Total Converted
            </Text>
            <Text className="font-semibold text-xl">{`${finalDashboardData?.todayConverted}`}</Text>
          </Box>
        </Box>
      </Box>
      <Text className="mt-4 font-semibold text-xl">Total Overview</Text>
      <Box className="mt-2 rounded-xl border-[1px] border-border1 bg-white">
        <Box className="flex-row items-center">
          <TodayLeadGraph
            total={finalDashboardData?.totalLead}
            converted={finalDashboardData?.totalConverted}
          />
          <Box>
            <Box className="h-2 w-8 rounded-full bg-[#CCCCCC]" />
            <Text className="mt-1 text-sm text-graniteGray">Total Lead</Text>
            <Text className="font-semibold text-xl">{`${finalDashboardData?.totalLead}`}</Text>
            <Box className="mt-4 h-2 w-8 rounded-full bg-[#4CAF50]" />
            <Text className="mt-1 text-sm text-graniteGray">
              Total Converted
            </Text>
            <Text className="font-semibold text-xl">{`${finalDashboardData?.totalConverted}`}</Text>
          </Box>
        </Box>
      </Box>
      <Text className="mt-4 font-semibold text-xl">Team Overview</Text>
      <Box className="mt-2 rounded-xl border-[1px] border-border1 bg-white">
        <Box className="flex-row items-center">
          <TeamGraph {...teamFinalReport} />
          <Box>
            <GraphCons
              color={'#B0BEC5'}
              title={'Total Lead'}
              value={teamFinalReport?.total}
            />
            <GraphCons
              color={'#5C6BC0'}
              title={'In Bucket'}
              value={teamFinalReport?.bucket}
            />
            <GraphCons
              color={'#9575CD'}
              title={'In Followup'}
              value={teamFinalReport?.followup}
            />
            <GraphCons
              color={'#FFA726'}
              title={'In Meeting'}
              value={teamFinalReport?.meeting}
            />
            <GraphCons
              color={'#EF5350'}
              title={'Rejected'}
              value={teamFinalReport?.rejected}
            />
            <GraphCons
              color={'#66BB6A'}
              title={'Converted'}
              value={teamFinalReport?.converted}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
const GraphCons = ({color, title, value}: any) => {
  return (
    <Box className="flex-row items-center mt-2">
      <Box className="h-4 w-4 rounded-full" style={{backgroundColor: color}} />
      <Text className="ml-2 text-sm text-graniteGray">{title}</Text>
      <Text className="ml-2 font-medium text-sm">{`${value}`}</Text>
    </Box>
  );
}

export const TeamGraph = ({
  total,
  bucket,
  followup,
  meeting,
  rejected,
  converted,
}: any) => {
  const bucketProgress = total <= 0 ? 0 : (bucket / total) * 100;
  const followupProgress = total <= 0 ? 0 : (followup / total) * 100;
  const meetingProgress = total <= 0 ? 0 : (meeting / total) * 100;
  const rejectedProgress = total <= 0 ? 0 : (rejected / total) * 100;
  const convertedProgress = total <= 0 ? 0 : (converted / total) * 100;
  const totalProgress =
    total <= 0
      ? 0
      : (total - bucket - followup - meeting - rejected - converted) / total;
  return (
    <Box className="items-center justify-center">
      <Svg width={180} height={180}>
        <VictoryPie
          standalone={false}
          width={180}
          height={180}
          data={[
            {x: 'TotalLead', y: totalProgress},
            {x: 'Bucket', y: bucketProgress},
            {x: 'Followup', y: followupProgress},
            {x: 'Meeting', y: meetingProgress},
            {x: 'Rejected', y: rejectedProgress},
            {x: 'Converted', y: convertedProgress},
          ]}
          innerRadius={55}
          padAngle={0}
          colorScale={[
            '#B0BEC5',
            '#5C6BC0',
            '#9575CD',
            '#FFA726',
            '#EF5350',
            '#66BB6A',
          ]}
          labels={() => null}
        />
      </Svg>
      <Box style={{position: 'absolute', alignItems: 'center'}}>
        <Text className="text-sm text-graniteGray">Total Lead</Text>
        <Text className="font-semibold text-lg text-header">{total}</Text>
      </Box>
    </Box>
  );
};

export const TodayLeadGraph = ({total, converted}: any) => {
  const progress = total <= 0 ? 0 : (converted / total) * 100;
  return (
    <Box className="items-center justify-center">
      <Svg width={180} height={180}>
        <VictoryPie
          standalone={false}
          width={180}
          height={180}
          data={[
            {x: 'TotalLead', y: 100 - progress},
            {x: 'Converted', y: progress},
          ]}
          innerRadius={55}
          padAngle={0}
          colorScale={['#CCCCCC', '#4CAF50']}
          labels={() => null}
        />
      </Svg>
      <Box style={{position: 'absolute', alignItems: 'center'}}>
        <Text className="text-sm text-graniteGray">Total Lead</Text>
        <Text className="font-semibold text-lg text-header">{total}</Text>
      </Box>
    </Box>
  );
};
