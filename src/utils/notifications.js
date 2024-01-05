import * as Notifications from 'expo-notifications';
import { apiUrl } from "../../apiUrl";

async function registerForPushNotificationsAsync() {
  // Primero, solicita el permiso para las notificaciones
  const { status } = await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
    },
  });

  if (status !== 'granted') {
    alert('No se tienen permisos para enviar notificaciones!');
    return;
  }

  // Obtiene el token de notificación
  /*const tokenResponse = await Notifications.getExpoPushTokenAsync({
    experienceId: `@SuplaierMovil/SuplaierMovil`,
    projectId: 'baiernotificaciones',
  });
  console.log(tokenResponse); // enviar este token a backend
  return tokenResponse.data;*/
}

async function sendTokenToServer(token) {
    await fetch(`${apiUrl}/guardarTokenDispositivo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
  }

export {registerForPushNotificationsAsync, sendTokenToServer}; 
  
  