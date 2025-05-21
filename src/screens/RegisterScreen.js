import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false); // State to handle loading

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const emailValid = emailRegex.test(email);
        const passwordValid = password.length > 0 && confirmPassword === password;
        setIsFormValid(emailValid && passwordValid);
    }, [email, password, confirmPassword]);

    const handleRegister = async () => {
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
        } else if (!passwordRegex.test(password)) {
            errors.password = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.';
        }

        if (password !== confirmPassword) {
            errors.confirmPassword = 'Las contraseñas no coinciden.';
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        // Start loading
        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            navigation.replace('Home');
        } catch (error) {
            setError('Error al registrarse: ' + error.message);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <View style={styles.container}>
            <Text h3 style={styles.title}>Registro</Text>

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

            <Input
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                errorMessage={formErrors.confirmPassword}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Button
                title="Registrarse"
                onPress={handleRegister}
                containerStyle={styles.button}
                disabled={!isFormValid || loading} // Disable button if form is invalid or loading
                loading={loading} // Show loading spinner
            />

            <Button
                title="Volver al Login"
                type="outline"
                onPress={() => navigation.navigate('Login')}
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
