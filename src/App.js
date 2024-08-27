import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/index.js";
import Navbar from "./components/Navbar/Navbar.js";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
