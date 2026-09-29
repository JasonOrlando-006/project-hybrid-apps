import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Message, Msg } from '../components/message';
import { PasswordInput } from '../components/passwordInput';
import { findUser } from '../data/userStore';
import { colors } from '../theme/colors';
import { styles } from '../theme/styles';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<Msg>(null);

  const handleLogin = () => {
    if (username.trim() === '' || password === '') {
      setMsg({ text: 'Username dan password harus diisi.', ok: false });
      return;
    }
    const user = findUser(username, password);
    if (user) {
      setMsg({ text: `Login berhasil. Selamat datang, ${user.username}!`, ok: true });
    } else {
      setMsg({ text: 'Username atau password salah.', ok: false });
    }
  };

  return (
    <View style={styles.flex}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>Login</Text>
          <Message msg={msg} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor={colors.muted}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          <PasswordInput value={password} onChangeText={setPassword} placeholder="Password" />

          <TouchableOpacity onPress={() => router.push('/forgot-password')}>
            <Text style={styles.linkRight}>Lupa password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Masuk</Text>
          </TouchableOpacity>

          <View style={styles.row}>
            <Text style={styles.rowText}>Belum punya akun? </Text>
            <TouchableOpacity onPress={() => router.push('/register')}>
              <Text style={styles.link}>Daftar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}