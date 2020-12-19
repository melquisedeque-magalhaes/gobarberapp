import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 0px 30px ${Platform.OS === 'android' ? 110 : 40}px;
`;

export const Title = styled.Text`
    font-family: 'RobotoSlab-Medium';
    font-size: 24px;
    color: #f4ede8;
    margin: 64px 0 24px;
`;

export const BackToSign = styled.TouchableOpacity`
    border-top-width: 1px;
    border-color: #232129;
    border-style: solid;
    background: #312e38;

    padding: 16px 0 ${16 + getBottomSpace()}px;

    align-items: center;
    justify-content: center;
    flex-direction: row;
`;

export const BackToSignText = styled.Text`
    color: #f4ede8;
    font-size: 18px;
    font-family: 'RobotoSlab-Regular';
    margin-left: 16px;
`;
