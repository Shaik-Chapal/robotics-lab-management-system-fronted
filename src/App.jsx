import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import StudentPage from './Pages/User/StudentPage'
import StudentList from './Pages/User/StudentList'
import StaffPage from './Pages/User/StaffPage'
import StaffList from './Pages/User/StaffList'


function App() {


  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/student' element={<StudentPage/>} />
      <Route path='/studentlist' element={<StudentList/>} />
      <Route path='/staff' element={<StaffPage/>} />
      <Route path='/stafflist' element={<StaffList/>} />
    
     </Routes>
    </>
  )
}

export default App
