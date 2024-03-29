import React from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { Button } from 'react-native'; // Agrega esta importación

export default function Auth({ onSignIn }) {
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly']
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(JSON.stringify(userInfo, null, 2));
      onSignIn(userInfo); // Llama a la función onSignIn pasando la información del usuario
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // El usuario canceló el flujo de inicio de sesión
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // La operación (por ejemplo, inicio de sesión) ya está en progreso
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Los servicios de Google Play no están disponibles o están desactualizados
      } else {
        // Otro error ocurrió
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      console.log('Sesión cerrada exitosamente');
      // Aquí puedes realizar cualquier otra acción después de cerrar la sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
      <Button title="Cerrar sesión" onPress={signOut} />
    </>
  );
}
