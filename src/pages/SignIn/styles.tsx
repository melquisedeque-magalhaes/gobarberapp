import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

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

export const ForgotPasswordButton = styled.TouchableOpacity`
    margin-top: 24px;
`;

export const ForgotPasswordButtonText = styled.Text`
    color: #f4ede8;
    font-family: 'RobotoSlab-Regular';
    font-size: 16px;
`;

export const CreatedAccountButton = styled.TouchableOpacity`
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;

    align-items: center;
    justify-content: center;
    flex-direction: row;

    border-top-width: 1px;
    border-color: #232129;
    border-style: solid;
    background: #312e38;

    padding: 16px 0 ${16 + getBottomSpace()}px;
`;

export const CreatedAccountButtonText = styled.Text`
    margin-left: 16px;
    color: #ff9000;
    font-size: 18px;
    font-family: 'RobotoSlab-Regular';
`;
