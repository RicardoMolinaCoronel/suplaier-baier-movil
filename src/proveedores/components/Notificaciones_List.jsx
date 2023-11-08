import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const notificationsData = [
  {
    id: 1,
    text: 'Nueva oferta: 20% de descuento en productos de tecnología.',
    date: 'Hace 2 horas',
  },
  {
    id: 2,
    text: 'Oferta destacada: ¡No te pierdas esta oferta exclusiva!',
    date: 'Ayer',
  },
  {
    id: 3,
    text: 'Tienes una nueva pregunta de un cliente.',
    date: 'Hace 3 días',
  },
  {
    id: 4,
    text: 'Oferta especial: Compra 2 y lleva 1 gratis en todos los productos.',
    date: 'Hace 4 días',
  },
  {
    id: 5,
    text: 'Notificación importante: Actualiza tu información de contacto.',
    date: 'Hace 5 días',
  },
  {
    id: 6,
    text: 'Nueva oferta: 15% de descuento en productos de belleza.',
    date: 'Hace 6 días',
  },
  {
    id: 7,
    text: 'Oferta relámpago: ¡Por tiempo limitado!',
    date: 'Hace 7 días',
  },
  {
    id: 8,
    text: 'Tienes una nueva calificación de 5 estrellas de un cliente.',
    date: 'Hace 8 días',
  },
];

const Notificaciones_List = () => {
  return (
    <ScrollView style={styles.container}>
      {notificationsData.map((notification) => (
        <View key={notification.id} style={styles.notification}>
          <Text style={styles.notificationText}>{notification.text}</Text>
          <Text style={styles.notificationDate}>{notification.date}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notification: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  notificationText: {
    fontSize: 16,
  },
  notificationDate: {
    fontSize: 12,
    color: 'gray',
    marginTop: 8,
  },
});



export default Notificaciones_List;
