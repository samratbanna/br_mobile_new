import {create} from 'zustand';
import {Followups} from '~/interfaces/lead.interface';

interface FollowupStore {
  followupMap: Record<string, Followups[]>;

  setFollowupsForLead: (leadId: string, followups: Followups[]) => void;
  addFollowup: (followup: Followups) => void;
  updateFollowup: (updated: Followups) => void;
  removeFollowup: (_id: string, leadId: string) => void;

  getFollowupsByLeadId: (leadId: string) => Followups[];
  getFollowupById: (leadId: string, _id: string) => Followups | undefined;

  clearFollowups: () => void;
}

export const useFollowupStore = create<FollowupStore>((set, get) => ({
  followupMap: {},

  setFollowupsForLead: (leadId, followups) =>
    set(state => ({
      followupMap: {
        ...state.followupMap,
        [leadId]: followups,
      },
    })),

  addFollowup: followup =>
    set(state => {
      const list = state.followupMap[followup.leadId] || [];
      return {
        followupMap: {
          ...state.followupMap,
          [followup.leadId]: [...list, followup],
        },
      };
    }),

  updateFollowup: updated =>
    set(state => {
      const list = state.followupMap[updated.leadId] || [];
      return {
        followupMap: {
          ...state.followupMap,
          [updated.leadId]: list.map(f =>
            f._id === updated._id ? updated : f,
          ),
        },
      };
    }),

  removeFollowup: (_id, leadId) =>
    set(state => {
      const list = state.followupMap[leadId] || [];
      return {
        followupMap: {
          ...state.followupMap,
          [leadId]: list.filter(f => f._id !== _id),
        },
      };
    }),

  getFollowupsByLeadId: leadId => {
    return get().followupMap[leadId] || [];
  },

  getFollowupById: (leadId, _id) => {
    const list = get().followupMap[leadId] || [];
    return list.find(f => f._id === _id);
  },

  clearFollowups: () => set({followupMap: {}}),
}));
