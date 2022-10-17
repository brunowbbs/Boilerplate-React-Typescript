import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import Login from "./shared/components/Login";
import { AuthProvider } from "./shared/contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Login>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Login>
    </AuthProvider>
  );
}

export default App;
