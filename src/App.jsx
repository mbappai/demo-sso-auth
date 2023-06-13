import './App.css'
import { Routes, Route, RouterProvider, createBrowserRouter } from 'react-router-dom';
import {Flex} from '@chakra-ui/react'
import SignUp from './pages/signUp'
import Login from './pages/login'
import Redirect from './pages/redirect'


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Login />,
//   },
//   {
//     path: "signUp",
//     element: <SignUp/>,
//   },
//   {
//     path: "redirect",
//     element: <Redirect/>,
//   },
// ]);


function App() {



  return (
    <Flex width='100%' p={0}>
     {/* <RouterProvider router={router} /> */}
      <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signUp' element={<SignUp/>}/>
          <Route path='/redirect' element={<Redirect/>}/>
      </Routes> 
    </Flex>
  )
}

export default App
