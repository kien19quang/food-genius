import * as React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { themeColors } from '../../theme';

export interface ILoadingProps {
}

export default function Loading (props: ILoadingProps) {
  return (
    <View className='flex-1 justify-center items-center'>
      <ActivityIndicator size="large" color={themeColors.bgColor(1)} />
    </View>
  );
}
