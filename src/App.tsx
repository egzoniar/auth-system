import { QueryClient, QueryClientProvider } from 'react-query';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';

import JokeGenerator from './features/JokeGenerator';
import Home from './features/Home';
import Login from './features/Login';
import Register from './features/Register';

import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

import './App.css';
import UserDetails from './features/UserDetails';

const queryClient = new QueryClient()

function App() {
  
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <header className="App-header text-slate-700">
              <div className="px-8 py-6 rounded-md bg-white text-slate-700 drop-shadow-2xl max-w-[80vw]">
                <Routes>
                  <Route path='/' element={<ProtectedRoute />}>
                    <Route index element={<Home />} />
                    <Route path='home' element={<Home />} />
                    <Route path='me' element={<UserDetails />} />
                    <Route path='joke' element={<JokeGenerator />} />
                  </Route>

                  <Route element={<PublicRoute />}>
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                  </Route>

                  <Route path='*' element={<h1 className='text-4xl text-slate-700 font-thin'>404 Not Found</h1>} />
                </Routes>
              </div>
            </header>
          </AuthProvider>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
