import { extendTheme } from "@chakra-ui/react";

const gridTheme = extendTheme({
  components: {
    ReactGrid: {
      baseStyle: {
        // Estilos generales para el componente ReactGrid
        fontSize: "14px",
        fontFamily: "sans-serif",
        border: "10px solid #ddd",
      },
      row: {
        // Estilos para las filas
        backgroundColor: "#f5f5f5",
        padding: "10px",
      },
      cell: {
        // Estilos para las celdas
        border: "1px solid #ddd",
        padding: "50px",
      },
    },
  },
});

export default gridTheme;
