import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import PokemonDetails from './pages/PokemonDetails';
import Layout from './components/Layout';
import MyRoster from './pages/MyRoster';
import Leaderboard from './pages/Leaderboard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Homepage />} />
      <Route path="/pokemon/:id" element={<PokemonDetails />} />
      <Route path="/roster" element={<MyRoster />} /> 
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
