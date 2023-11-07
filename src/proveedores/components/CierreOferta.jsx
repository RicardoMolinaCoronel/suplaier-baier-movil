import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { apiUrl } from '../../apiUrl';

export const CerrarOferta = ({ oferta, setShowCerrarOferta, setShowCierreExitoso }) => {
  const [comprasInd, setComprasInd] = useState([]);
  const [seHaTerminado, setSeHaTerminado] = useState(false);

  const cerrarOferta = async () => {
    const body = {
      IdOferta: oferta.IdOferta,
      IdEstadosOferta: 11, // Id Estado PENDIENTE DB
    };

    try {
      const resp = await fetch(`${apiUrl}/cambiarofertaestado`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (resp.status === 200) {
        const data = await resp.json();
        console.log(!!data && 'cerrada la oferta');
        // setIrAObtenerComprasInd(true);
      } else {
        console.error('Error al cerrar la oferta');
      }
    } catch (error) {
      console.error('Error en la solicitud de cierre', error);
    }
  };

  const getComprasIndByOferta = async () => {
    const resp = await fetch(`${apiUrl}/compras?idOferta=${oferta?.IdOferta}`);
    const data = await resp.json();
    const compras = !!data && data.rows;
    setComprasInd(compras);
  };

  const cambiarAVerificandoPagosCompras = async () => {
    for (const compra of comprasInd) {
      const body = {
        IdCompra: compra.IdCompra,
        IdEstado: 3, // Id Estado Cerrado DB
        PagadoAProveedor: false,
      };

      try {
        const resp = await fetch(`${apiUrl}/compras`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        if (resp.status === 200) {
          const data = await resp.json();
          console.log(!!data && 'cambiando estado compra a verificando pagos');
        } else {
          console.error('Error al cambiar estado de compra a verificando pagos');
        }
      } catch (error) {
        console.error('Error en la solicitud de cambio de estado', error);
      }
    }

    setSeHaTerminado(true);
  };

  const efectuarPagoPaypal = (compra) => {
    // Simulación de pago con PayPal
    console.log(`Pagado con PayPal la compra con id: ${compra.IdCompra}`);
  };

  const verificarCompraMetodosPago = () => {
    comprasInd.forEach((compra) => {
      if (compra.MetodoPago === 'reserva') {
        setTimeout(() => {
          efectuarPagoPaypal(compra);
        }, 5000);
      }
    });
  };

  useEffect(() => {
    !!comprasInd && cambiarAVerificandoPagosCompras();
    // eslint-disable-next-line
  }, [comprasInd]);

  useEffect(() => {
    if (seHaTerminado) {
      setShowCierreExitoso(true);
      setShowCerrarOferta(false);
      verificarCompraMetodosPago();
    }
    // eslint-disable-next-line
  }, [seHaTerminado]);

  const onClickConfirmarCierre = () => {
    cerrarOferta()
      .then((res) => getComprasIndByOferta());
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.accionWarningVentana}>
        <View style={styles.metodoPagoBarraSup}></View>
        <View style={styles.accionWarningVentanaTextoBox}>
          <Text style={styles.iconWarning}>warning</Text>
          <Text style={styles.paragraph} align="center">
            Su oferta ha alcanzado <b>la mínima cantidad de productos a vender</b>, sin embargo, la oferta todavía{' '}
            <b>no ha llegado a su fecha de vigencia</b>. <br />
            Si está seguro de cerrar su oferta, de clic en <b>Cerrar oferta</b>.
          </Text>
        </View>
        <View style={styles.metodoPagoBtnBox}>
          <Button
            title="Cerrar oferta"
            onPress={onClickConfirmarCierre}
            color="blue"
          />
        </View>
      </View>
    </View>
  );
};



const styles = {
    accionWarningVentana: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    metodoPagoBarraSup: {
      backgroundColor: 'blue', // Color de fondo de la barra superior
      height: 20,
    },
    accionWarningVentanaTextoBox: {
      alignItems: 'center',
    },
    iconWarning: {
      fontSize: 30, // Tamaño del icono de advertencia
      color: 'red', // Color del icono de advertencia
    },
    paragraph: {
      textAlign: 'center',
      marginTop: 10,
      fontSize: 16,
    },
    metodoPagoBtnBox: {
      marginTop: 20,
    },
  };