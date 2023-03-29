import { Routes, Route } from 'react-router-dom';

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

import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div id="wrapper">
        <Header />

        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/create-movie' element={<CreateMovie />} />
            <Route path='/catalog/:movieId' element={<Details />} />
            <Route path='/catalog/:movieId/edit' element={<EditMovie />} />
          </Routes>
        </main>

      </div>
      <Footer />
    </AuthProvider>
  );
}

export default App;
