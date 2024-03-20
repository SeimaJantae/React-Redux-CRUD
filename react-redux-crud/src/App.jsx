import { useRoutes } from "react-router-dom";
import BlogList from "./pages/BlogList";
import BlogEdit from "./pages/BlogEdit";

function App() {
  const element = useRoutes([
    { path: "/", element: <BlogList /> },
    { path: "/create", element: <BlogEdit /> },
    { path: "/edit/:id", element: <BlogEdit /> },
  ]);
  return element;
}

export default App;
