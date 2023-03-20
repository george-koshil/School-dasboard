import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./app/components/ErrorBoundary/ErrorBoundary";
import { routes } from "./app/router/routes";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import MainLayout from "./app/components/MainLayout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
      <main>
        <Routes>
          {routes.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <ErrorBoundary key={path}>
                  <Suspense
                    fallback={
                      <Box sx={{ display: "flex" }}>
                        <CircularProgress />
                      </Box>
                    }
                  >
                    <Component />
                  </Suspense>
                </ErrorBoundary>
              }
            />
          ))}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
