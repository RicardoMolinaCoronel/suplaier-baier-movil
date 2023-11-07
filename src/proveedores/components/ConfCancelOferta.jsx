import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { apiUrl } from '../../apiUrl';
import { AuthContext } from '../../auth';

export const ConfirmarCancelarOferta = ({ oferta, setShowConfirmarCancelarOferta, setShowAccionExitosa }) => {
  const { authState: { user } } = useContext(AuthContext);

  const actualizarOferta = async () => {
    const bodySolicitud = {
      IdOferta: oferta,
      IdEstadosOferta: 7, //Id Estado DB
    };

    try {
      const resp = await fetch(`${apiUrl}/ofertas/estadoOferta`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodySolicitud),
      });

      if (resp.status === 200) {
        const dataSolicitud = await resp.json();
        console.log(!!dataSolicitud && 'Cancelando Oferta');
      } else {
        console.error('Error al actualizar la oferta');
      }
    } catch (error) {
      console.error('Error en la solicitud de actualización', error);
    }
  };

  const onActualizarOferta = () => {
    actualizarOferta();
    setShowConfirmarCancelarOferta(false);
    setShowAccionExitosa(true);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.resumenProducto}>
        <View style={styles.resumenProductoVentana}>
          <View style={styles.metodoPagoBarraSupProv}></View>
          <View style={styles.resumenProductoVentanaContenido}>
            <View style={styles.explorarCatTitle}>
              <Text style={styles.iconGrey}>arrow_forward_ios</Text>
              <Text style={styles.paragraphMid}><b>Cancelar Oferta</b></Text>
            </View>
            <View style={styles.hrGeneral} />
            <View style={styles.compraProductoBox}>
              <Text style={styles.paragraph}>
                ¿Está seguro de cancelar la oferta?, los pagos serán devueltos a los compradores y podría existir una tarifa de cobro adicional.
              </Text>
            </View>
            <View style={styles.metodoPagoBtnBox}>
              <Button
                title="Retroceder"
                onPress={() => setShowConfirmarCancelarOferta(false)}
                color="red"
              />
              <Button
                title="Aceptar"
                onPress={onActualizarOferta}
                color="blue"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};


const styles = {
    resumenProducto: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    resumenProductoVentana: {
      // Estilos para la ventana de resumenProducto
    },
    metodoPagoBarraSupProv: {
      // Estilos para la barra superior del proveedor de método de pago
    },
    resumenProductoVentanaContenido: {
      // Estilos para el contenido de la ventana de resumenProducto
    },
    explorarCatTitle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconGrey: {
      // Estilos para el ícono gris
    },
    paragraphMid: {
      // Estilos para el párrafo mediano
    },
    hrGeneral: {
      // Estilos para la línea horizontal
      borderBottomWidth: 1,
      borderColor: 'black',
      marginBottom: 10,
    },
    compraProductoBox: {
      // Estilos para el cuadro de compra de producto
    },
    paragraph: {
      
    },
    metodoPagoBtnBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
  };