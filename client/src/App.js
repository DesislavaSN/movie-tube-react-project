import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { MovieProvider } from './contexts/MovieContext';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Catalog from './components/Catalog/Catalog';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import CreateMovie from './components/CreateMovie/CreateMovie';
import Details from './components/Details/Details';
import EditMovie from './components/EditMovie/EditMovie';
import Logout from './components/Logout/Logout';
import Profile from './components/Profile/Profile';
import Error404 from './components/Error404/Error404';
import RouteGuard from './common/RouteGuard';


function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        <div id="wrapper">
          <Header />

          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/catalog' element={<Catalog />} />
              <Route path='/catalog/:movieId' element={<Details />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />

              <Route element={<RouteGuard /> }>
                <Route path='/logout' element={<Logout />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/create-movie' element={<CreateMovie />} />
                <Route path='/catalog/:movieId/edit' element={<EditMovie />} />
              </Route>
              
              <Route path='*' element={<Error404 />} />
            </Routes>
          </main>

        </div>
        <Footer />
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;
