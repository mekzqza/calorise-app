import { useCallback, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { fetchHealthPing } from '../services/api';

export const HomeScreen = () => {
  const [lastAction, setLastAction] = useState<string>('Idle');
  const [backendStatus, setBackendStatus] = useState<string>('unknown');

  const requestCameraPermission = useCallback(async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Camera permissions are required.');
      return;
    }
    setLastAction('Camera permission granted');
  }, []);

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });

    if (!result.canceled) {
      setLastAction(`Selected ${result.assets[0].uri}`);
    }
  }, []);

  const pingBackend = useCallback(async () => {
    try {
      const response = await fetchHealthPing();
      setBackendStatus(response.status);
      setLastAction('Backend reachable');
    } catch (error) {
      setBackendStatus('error');
      setLastAction('Backend unreachable');
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calorie App</Text>
      <Text style={styles.subtitle}>Last action: {lastAction}</Text>
      <Text style={styles.subtitle}>Backend: {backendStatus}</Text>
      <View style={styles.buttonGroup}>
        <Button title="Request Camera" onPress={requestCameraPermission} />
      </View>
      <View style={styles.buttonGroup}>
        <Button title="Pick Image" onPress={pickImage} />
      </View>
      <View style={styles.buttonGroup}>
        <Button title="Ping Backend" onPress={pingBackend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 16,
    color: '#334155',
  },
  buttonGroup: {
    alignSelf: 'stretch',
  },
});

export default HomeScreen;
