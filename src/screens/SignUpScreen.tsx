import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { supabase } from '../supabase/supabaseClient';

const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false); // Toggle between user/admin sign-up

    const handleSignUp = async () => {
        try {
            if (isAdmin) {
                const { data, error } = await supabase.auth.admin.createUser({
                    email,
                    password,
                    email_confirm: true, // Automatically confirm email for admins
                });

                if (error) throw error;
                console.log('Admin Sign-Up Success:', data);
                Alert.alert('Admin Sign-Up Successful', 'You can now log in!');
            } else {
                const { error } = await supabase.auth.signUp({ email, password });

                if (error) throw error;
                Alert.alert('User Sign-Up Successful', 'You can now log in.');
            }
        } catch (error: any) {
            console.error('Sign-Up Error:', error);
            Alert.alert('Sign-Up Failed', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Sign Up" onPress={handleSignUp} />
            <View style={styles.toggleContainer}>
                <Text style={styles.toggleText}>
                    {isAdmin ? 'Switch to User Sign-Up' : 'Switch to Admin Sign-Up'}
                </Text>
                <Button
                    title="Toggle"
                    onPress={() => setIsAdmin((prev) => !prev)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    toggleContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    toggleText: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default SignUpScreen;
