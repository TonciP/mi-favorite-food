import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text, Icon } from 'react-native-elements';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [loading, setLoading] = useState(false); // State to handle loading

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    useEffect(() => {
        const emailValid = emailRegex.test(email);
        const passwordValid = password.length > 0;

        setIsFormValid(emailValid && passwordValid);
    }, [email, password]);

    const handleLogin = async () => {
        setFormErrors({});
        setError('');
        let errors = {};

        if (!email) {
            errors.email = 'Por favor ingresa tu correo electrónico.';
        } else if (!emailRegex.test(email)) {
            errors.email = 'El formato del correo electrónico no es válido.';
        }

        if (!password) {
            errors.password = 'La contraseña no puede estar vacía.';
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        // Start loading
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            navigation.replace('Home');
        } catch (error) {
            setError('Error al iniciar sesión: ' + error.message);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <View style={styles.container}>
            <Text h3 style={styles.title}>Mi Comida Favorita</Text>

            <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                errorMessage={formErrors.email}
            />

            <Input
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                errorMessage={formErrors.password}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Button
                title="Iniciar Sesión"
                onPress={handleLogin}
                containerStyle={styles.button}
                disabled={!isFormValid || loading} // Disable button if form is invalid or loading
                loading={loading} // Show loading spinner
            />

            <Button
                title="Registrarse"
                type="outline"
                onPress={() => navigation.navigate('Register')}
                containerStyle={styles.button}
                disabled={loading} // Disable button while loading
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        marginVertical: 10,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
});
