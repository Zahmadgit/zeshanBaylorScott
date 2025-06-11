import {Platform, Alert} from 'react-native';

const alertBrowser = (title: string, description: string, options: any[]) => {
  const result = window.confirm(
    [title, description].filter(Boolean).join('\n'),
  );

  if (result) {
    const confirmOption = options.find(({style}) => style !== 'cancel');
    confirmOption && confirmOption.onPress();
  } else {
    const cancelOption = options.find(({style}) => style === 'cancel');
    cancelOption && cancelOption.onPress();
  }
};

// Use platform-specific alert, windom.confirm for web and Alert.alert for native
const platformAlert = Platform.OS === 'web' ? alertBrowser : Alert.alert;
export default platformAlert;
