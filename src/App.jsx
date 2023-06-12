import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login'
import Redirect from './pages/redirect'


function App() {

  return (
    <>
      <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/redirect' element={<Redirect/>}/>
      </Routes>
    </>
  )
}

export default App
