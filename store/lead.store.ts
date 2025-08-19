import {create} from 'zustand';
import {Lead} from '~/interfaces/lead.interface';

type LeadCategory = 'all' | 'bucket' | 'meeting' | 'followup' | 'conversions';

interface LeadStore {
  selectedLeadIndex: number;
  selectedCategory: LeadCategory;
  setSelectedLeadIndex: (index: number) => void;
  setSelectedCategory: (category: LeadCategory) => void;

  categorizedLeads: Record<LeadCategory, Lead[]>;
  setLeadList: (category: LeadCategory, leads: Lead[]) => void;

  addLead: (category: LeadCategory, lead: Lead) => void;
  updateLead: (category: LeadCategory, updatedLead: Lead) => void;
  updateLeadStatus: (
    category: LeadCategory,
    _id: string,
    status: Lead['status'],
  ) => void;
  removeLead: (category: LeadCategory, _id: string) => void;
  getSelectedLead: () => Lead | null;
  clearLeads: () => void;
}

export const useLeadStore = create<LeadStore>((set, get) => ({
  selectedLeadIndex: 0,
  selectedCategory: 'all',
  setSelectedLeadIndex: index => set({selectedLeadIndex: index}),
  setSelectedCategory: category => set({selectedCategory: category}),

  categorizedLeads: {
    all: [],
    bucket: [],
    meeting: [],
    followup: [],
    conversions: [],
  },

  setLeadList: (category, leads) =>
    set(state => ({
      categorizedLeads: {
        ...state.categorizedLeads,
        [category]: leads,
      },
    })),

  addLead: (category, lead) =>
    set(state => ({
      categorizedLeads: {
        ...state.categorizedLeads,
        [category]: [...state.categorizedLeads[category], lead],
      },
    })),

  updateLead: (category, updatedLead) =>
    set(state => ({
      categorizedLeads: {
        ...state.categorizedLeads,
        [category]: state.categorizedLeads[category].map(lead =>
          lead._id === updatedLead._id ? updatedLead : lead,
        ),
      },
    })),

  updateLeadStatus: (category, _id, status) =>
    set(state => ({
      categorizedLeads: {
        ...state.categorizedLeads,
        [category]: state.categorizedLeads[category].map(lead =>
          lead._id === _id ? {...lead, status} : lead,
        ),
      },
    })),

  removeLead: (category, _id) =>
    set(state => ({
      categorizedLeads: {
        ...state.categorizedLeads,
        [category]: state.categorizedLeads[category].filter(
          lead => lead._id !== _id,
        ),
      },
    })),

  getSelectedLead: () => {
    const {categorizedLeads, selectedCategory, selectedLeadIndex} = get();
    return categorizedLeads[selectedCategory]?.[selectedLeadIndex] ?? null;
  },

  clearLeads: () =>
    set({
      categorizedLeads: {
        all: [],
        bucket: [],
        meeting: [],
        followup: [],
        conversion: [],
      },
      selectedLeadIndex: 0,
    }),
}));

// import {create} from 'zustand';
// import {Lead} from '~/interfaces/lead.interface';

// interface LeadStore {
//   selectedLeadIndex: number;
//   setSelectedLeadIndex: (index: number) => void;

//   leadList: Lead[];
//   setLeadList: (leadList: Lead[]) => void;

//   addLead: (lead: Lead) => void;
//   updateLead: (updatedLead: Lead) => void;
//   updateLeadStatus: (_id: string, status: Lead['status']) => void;
//   removeLead: (_id: string) => void;
//   getSelectedLead: () => Lead | null;
//   clearLeads: () => void;
// }

// export const useLeadStore = create<LeadStore>((set, get) => ({
//   selectedLeadIndex: 0,
//   setSelectedLeadIndex: index => set({selectedLeadIndex: index}),

//   leadList: [],
//   setLeadList: leadList => set({leadList}),

//   addLead: lead => {
//     set(state => ({leadList: [...state.leadList, lead]}));
//   },

//   updateLead: updatedLead => {
//     set(state => ({
//       leadList: state.leadList.map(lead =>
//         lead._id === updatedLead._id ? updatedLead : lead,
//       ),
//     }));
//   },

//   updateLeadStatus: (_id, status) => {
//     set(state => ({
//       leadList: state.leadList.map(lead =>
//         lead._id === _id ? {...lead, status} : lead,
//       ),
//     }));
//   },

//   removeLead: _id => {
//     set(state => ({
//       leadList: state.leadList.filter(lead => lead._id !== _id),
//     }));
//   },

//   getSelectedLead: () => {
//     const {leadList, selectedLeadIndex} = get();
//     return leadList[selectedLeadIndex] ?? null;
//   },

//   clearLeads: () => set({leadList: [], selectedLeadIndex: 0}),
// }));
