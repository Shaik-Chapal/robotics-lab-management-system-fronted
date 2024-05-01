import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import StudentPage from './Pages/User/StudentPage'
import StudentList from './Pages/User/StudentList'


function App() {


  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/student' element={<StudentPage/>} />
      <Route path='/studentlist' element={<StudentList/>} />
    
     </Routes>
    </>
  )
}

export default App
