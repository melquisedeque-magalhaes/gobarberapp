import React, { useCallback, useRef } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    View,
    ScrollView,
    TextInput,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErros';
import Input from '../../components/Input';
import Button from '../../components/Button';

import LogoImg from '../../assets/logo.png';

import {
    Container,
    Title,
    ForgotPasswordButton,
    ForgotPasswordButtonText,
    CreatedAccountButton,
    CreatedAccountButtonText,
} from './styles';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const { signIn } = useAuth();

    const navigation = useNavigation();

    const formRef = useRef<FormHandles>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const HandleSubmit = useCallback(
        async (data: SignInFormData) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('E-mail é Obrigatório')
                        .email('Digite um E-mail Valido'),
                    password: Yup.string().min(6, 'No minímo 6 digitos'),
                });

                await schema.validate(data, { abortEarly: false });

                await signIn({
                    email: data.email,
                    password: data.password,
                });
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);

                    formRef.current?.setErrors(errors);

                    return;
                }

                Alert.alert(
                    'Error na Autenticação',
                    'Ocorreu um erro ao fazer login, cheque as credenciais',
                );
            }
        },
        [signIn],
    );

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flex: 1 }}
                >
                    <Container>
                        <Image source={LogoImg} />

                        <View>
                            <Title>Faça seu login</Title>
                        </View>

                        <Form onSubmit={HandleSubmit} ref={formRef}>
                            <Input
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    passwordInputRef.current?.focus()
                                }
                            />

                            <Input
                                ref={passwordInputRef}
                                secureTextEntry
                                name="password"
                                icon="lock"
                                placeholder="Senha"
                                returnKeyType="send"
                                onSubmitEditing={() =>
                                    formRef.current?.submitForm()
                                }
                            />

                            <Button
                                onPress={() => formRef.current?.submitForm()}
                            >
                                Entrar
                            </Button>
                        </Form>

                        <ForgotPasswordButton>
                            <ForgotPasswordButtonText>
                                Esqueci minha senha
                            </ForgotPasswordButtonText>
                        </ForgotPasswordButton>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <CreatedAccountButton onPress={() => navigation.navigate('SignUp')}>
                <Icon name="log-in" size={20} color="#FF9000" />
                <CreatedAccountButtonText>
                    Criar uma conta
                </CreatedAccountButtonText>
            </CreatedAccountButton>
        </>
    );
};

export default SignIn;
