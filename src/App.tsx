import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux';
import Diary from './pages/Diary';
import Calendar from './pages/Calendar';
import Register from './pages/Register';
import Nav from './components/Nav';
import Before from './pages/Before';
import After from './pages/After';

const Layout = () => {
  return (
    <>
      <Nav></Nav>
      <Outlet></Outlet>
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Diary />}></Route>
      <Route path="diary" element={<Diary />}></Route>
      <Route path="calendar" element={<Calendar />}></Route>
      <Route path="register" element={<Register />}></Route>
      <Route path="before" element={<Before />}></Route>
      <Route path="after" element={<After />}></Route>
    </Route>
  )
);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </Provider>
  );
}
