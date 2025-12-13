import React, { createContext, useReducer, useContext } from 'react';

// Initial State
// Initial State
const initialState = {
  step: 1,
  theme: 'standard', // standard | classic | modern | retro | royal | elegant
  formData: {
    // Basic
    fullName: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: '',
    profileImage: null,

    // Personal Details
    height: '',
    complexion: '',
    maritalStatus: 'Never Married',
    religion: 'Hindu',
    caste: '',

    // Horoscope
    rasi: '',
    nakshatra: '',
    gotra: '',
    manglik: 'No',

    // Education & Job
    education: '',
    occupation: '',
    company: '',
    income: '',

    // Family
    fatherName: '',
    fatherOccupation: '',
    motherName: '',
    motherOccupation: '',
    siblings: [], // Changed to array for Phase 4
    nativePlace: '',

    // Contact
    contactNumber: '',
    email: '',
    address: '',

    // Custom Fields
    customFields: [], // { id, section, label, value }
  }
};

// Actions
const TYPES = {
  SET_STEP: 'SET_STEP',
  NEXT_STEP: 'NEXT_STEP',
  PREV_STEP: 'PREV_STEP',
  UPDATE_FIELD: 'UPDATE_FIELD',
  SET_THEME: 'SET_THEME',
  RESET: 'RESET',
  SET_IMAGE: 'SET_IMAGE',
  ADD_SIBLING: 'ADD_SIBLING',
  REMOVE_SIBLING: 'REMOVE_SIBLING',
  ADD_CUSTOM_FIELD: 'ADD_CUSTOM_FIELD',
  REMOVE_CUSTOM_FIELD: 'REMOVE_CUSTOM_FIELD',
};

// Reducer
const bioDataReducer = (state, action) => {
  switch (action.type) {
    case TYPES.SET_STEP:
      return { ...state, step: action.payload };
    case TYPES.NEXT_STEP:
      return { ...state, step: state.step + 1 };
    case TYPES.PREV_STEP:
      return { ...state, step: Math.max(1, state.step - 1) };
    case TYPES.UPDATE_FIELD:
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value
        }
      };
    case TYPES.SET_IMAGE:
      return {
        ...state,
        formData: {
          ...state.formData,
          profileImage: action.payload
        }
      };
    case TYPES.ADD_SIBLING:
      return {
        ...state,
        formData: {
          ...state.formData,
          siblings: [...(state.formData.siblings || []), action.payload]
        }
      };
    case TYPES.REMOVE_SIBLING:
      return {
        ...state,
        formData: {
          ...state.formData,
          siblings: state.formData.siblings.filter((_, i) => i !== action.payload)
        }
      };
    case TYPES.ADD_CUSTOM_FIELD:
      return {
        ...state,
        formData: {
          ...state.formData,
          customFields: [...(state.formData.customFields || []), action.payload]
        }
      };
    case TYPES.REMOVE_CUSTOM_FIELD:
      return {
        ...state,
        formData: {
          ...state.formData,
          customFields: state.formData.customFields.filter((_, i) => i !== action.payload)
        }
      };
    case TYPES.SET_THEME:
      return { ...state, theme: action.payload };
    case TYPES.RESET:
      return initialState;
    default:
      return state;
  }
};

// Context
const BioDataContext = createContext();

export const BioDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bioDataReducer, initialState);

  return (
    <BioDataContext.Provider value={{ state, dispatch, TYPES }}>
      {children}
    </BioDataContext.Provider>
  );
};

export const useBioData = () => {
  const context = useContext(BioDataContext);
  if (!context) {
    throw new Error('useBioData must be used within a BioDataProvider');
  }
  return context;
};
