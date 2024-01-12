import React, { useEffect, useState } from "react";
import { View, Modal, FlatList } from "react-native";
import { apiUrl } from "../../../apiUrl";
import { HistorialCard } from "./HistorialCard";
import { ButtonWithText } from "./ButtonWithText";

export const HistorialModal = ({ isvisiblemodal, oncloseHistorial }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getHistorial = async () => {
      const resp = await fetch(`${apiUrl}/historialOferta`);
      const responseData = await resp.json();
      console.log("modal hisotirial", responseData);
      setData(responseData.rows);
    };
    getHistorial();
  }, []);

  return (
    <Modal transparent visible={isvisiblemodal} animationType="slide">
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#ffffff",
          flex: 1,
          padding: "5%",
          marginHorizontal: "15%",
          marginTop: "20%",
          marginBottom: "10%",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
          borderRadius: 15,
        }}
      >
        <FlatList
          keyExtractor={(item) => {
            item.AuditLogId.toString();
          }}
          data={data}
          renderItem={({ item }) => <HistorialCard item={item} />}
        />
        <ButtonWithText anyfunction={oncloseHistorial} title="cerrar" />
      </View>
    </Modal>
  );
};
