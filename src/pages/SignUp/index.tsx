import React, { useCallback, useRef } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    View,
    TextInput,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import LogoImg from '../../assets/logo.png';
import getValidationErrors from '../../utils/getValidationErros';
import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

import { Container, Title, BackToSign, BackToSignText } from './styles';

const SingUp: React.FC = () => {
    const navigation = useNavigation();

    const FormRef = useRef<FormHandles>(null);
    const InputPasswordRef = useRef<TextInput>(null);
    const InputEmailRef = useRef<TextInput>(null);

    const HandleSubmit = useCallback(
        async (data: SignUpFormData) => {
            try {
                FormRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    name: Yup.string().required('Nome é Obrigatorio'),
                    email: Yup.string()
                        .required('E-mail é obrigatorio')
                        .email('Digite um E-mail Valido'),
                    password: Yup.string().min(6, 'No minimo 6 digitos'),
                });

                await schema.validate(data, { abortEarly: false });

                await api.post('/users', data);

                Alert.alert(
                    'Cadastro Realizado com Sucesso!',
                    'Você ja pode fazer login no GoBarber',
                );

                navigation.goBack();
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);

                    FormRef.current?.setErrors(errors);

                    return;
                }

                Alert.alert(
                    'Error no Cadastro',
                    'Ocorreu um erro o cadastro, cheque as credenciais',
                );
            }
        },
        [navigation],
    );

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled
            >
                <ScrollView
                    contentContainerStyle={{ flex: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <Container>
                        <Image source={LogoImg} />

                        <View>
                            <Title>Crie sua conta</Title>
                        </View>

                        <Form ref={FormRef} onSubmit={HandleSubmit}>
                            <Input
                                autoCorrect={false}
                                autoCapitalize="words"
                                placeholder="Nome"
                                name="name"
                                icon="user"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    InputEmailRef.current?.focus()
                                }
                            />
                            <Input
                                ref={InputEmailRef}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                                placeholder="E-mail"
                                name="email"
                                icon="mail"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    InputPasswordRef.current?.focus();
                                }}
                            />
                            <Input
                                ref={InputPasswordRef}
                                secureTextEntry
                                placeholder="Senha"
                                name="password"
                                icon="lock"
                                returnKeyType="send"
                                onSubmitEditing={() =>
                                    FormRef.current?.submitForm()
                                }
                                textContentType="newPassword"
                            />

                            <Button
                                onPress={() => FormRef.current?.submitForm()}
                            >
                                Cadastrar
                            </Button>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

            <BackToSign onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={20} color="#F4EDE8" />
                <BackToSignText>Voltar para o login</BackToSignText>
            </BackToSign>
        </>
    );
};

export default SingUp;
