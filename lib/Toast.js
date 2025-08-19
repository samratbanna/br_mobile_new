/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Toast, {BaseToast, ErrorToast, InfoToast} from 'react-native-toast-message';

export const showSuccessToast = (text1, text2, config) => {
  Toast.show({
    type: 'success',
    text1: text1,
    text2: text2,
    ...config,
  });
};

export const showErrorToast = (text1, text2, config) => {
  Toast.show({
    type: 'error',
    text1: text1,
    text2: text2,
    ...config,
  });
};

export const showInfoToast = (text1, text2, config) => {
  Toast.show({
    type: 'info',
    text1: text1,
    text2: text2,
    ...config,
  });
};

export const toastConfig = {
  /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
  success: props => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: 'green',
        marginTop : 10
      }}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
        fontFamily: 'Poppins',
      }}
      text2Style = {{
        fontFamily: 'Poppins',
      }}

      text1NumberOfLines={0}
    />
  ),
  /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
  error: props => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
        fontFamily: 'Poppins',
      }}
      text2Style={{
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'Poppins',
      }}
      style={{borderLeftColor: 'red', marginTop : 10}}
      text1NumberOfLines={0}
    />
  ),

  info: props => (
    <InfoToast
      {...props}
      style={{
        borderLeftColor: 'orange',
        marginTop : 10
      }}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
        fontFamily: 'Poppins',
      }}
      text2Style  = {{
        fontFamily : 'Poppins'
      }}
      text1NumberOfLines={0}
    />
  ),
  /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.

      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
};

/*
    2. Pass the config as prop to the Toast component instance
  */
