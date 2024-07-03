// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#388e3c',  // Green color
    },
    secondary: {
      main: '#81c784',  // Light green color
    },
    background: {
      default: '#e8f5e9',  // Very light green
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#388e3c',  // Green AppBar
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',  // Remove uppercase transformation
        },
      },
    },
  },
});

export default theme;
