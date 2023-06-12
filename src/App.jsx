import './App.css'
import { Routes, Route, RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignUp from './pages/signUp'
import Login from './pages/login'
import Redirect from './pages/redirect'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "signUp",
    element: <SignUp/>,
  },
  {
    path: "redirect",
    element: <Redirect/>,
  },
]);


function App() {



  return (
    <>
     <RouterProvider router={router} />
      {/* <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signUp' element={<SignUp/>}/>
          <Route path='/redirect' element={<Redirect/>}/>
      </Routes> */}
    </>
  )
}

export default App
