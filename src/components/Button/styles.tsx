import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
    align-items: center;
    justify-content: center;

    background: #ff9000;
    height: 60px;
    border-radius: 10px;
    margin-top: 16px;
`;

export const ButtonText = styled.Text`
    font-size: 16px;
    font-family: 'RobotoSlab-Medium';
`;
