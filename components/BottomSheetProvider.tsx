import React, { createContext, useContext, useRef, useState, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";

// Create a context for the BottomSheet
const BottomSheetContext = createContext(null);

// Custom hook to use BottomSheet
export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error("useBottomSheet must be used within a BottomSheetProvider");
  }
  return context;
};

// BottomSheetProvider Component
export const BottomSheetProvider = ({ children }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);
  const [content, setContent] = useState<React.ReactNode>(null);

  const openSheet = (newContent: React.ReactNode) => {
    
    setContent(newContent); // Set dynamic content
    bottomSheetRef.current?.expand(); // Open the sheet
  };

  const closeSheet = () => bottomSheetRef.current?.close(); // Close the sheet

  return (
    <BottomSheetContext.Provider value={{ openSheet, closeSheet }}>
      <View style={{ flex: 1, elevation: 4 }}>
        {children}

        {/* BottomSheet Component */}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1} // Initially closed
          snapPoints={snapPoints}
          backgroundStyle={{elevation: 5}}
          enablePanDownToClose
        >
          <View style={styles.content}>{content}</View>
        </BottomSheet>
      </View>
    </BottomSheetContext.Provider>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 5,
  },
});
