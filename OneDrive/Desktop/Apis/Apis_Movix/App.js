import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Auth from "./components/Auth";

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleSignIn = (userInfo) => {
    setIsSignedIn(true);
    setUserData(userInfo);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setUserData(null);
  };

  return (
    <View style={styles.container}>
      {!isSignedIn ? (
        <Auth onSignIn={handleSignIn} />
      ) : (
        <View>
          <Text>Bienvenido, {userData?.givenName}!</Text>
          <Button title="Cerrar sesión" onPress={handleSignOut} />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
