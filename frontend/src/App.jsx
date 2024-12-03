import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import PokemonDetails from './pages/PokemonDetails';
import Layout from './components/Layout';
import MyRoster from './pages/MyRoster';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Homepage />} /> {/* Homepage as the default route */}
      <Route path="/pokemon/:id" element={<PokemonDetails />} />
      <Route path="/roster" element={<MyRoster />} /> 

    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

