import { ThemeProvider, createTheme } from "@mui/material/styles"
import { CssBaseline, AppBar, Toolbar, Typography, Container, Box } from "@mui/material"
import GlobalSearchBar from "../components/GlobalSearchBar"

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
})

export default function HomePage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Website
          </Typography>
          <GlobalSearchBar />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Our Website
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Try the global search bar in the top right corner!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Click the search icon or press Ctrl + K to open the search modal. Use the browse icon to explore all
            available pages.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
