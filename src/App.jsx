import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import UniversityNews from './Pages/Home/UniversityNews'
import ResearchNews from './Pages/Home/ResearchNews'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import StudentPage from './Pages/User/StudentPage'
import StudentList from './Pages/User/StudentList'
import DepartmentPage from './Pages/User/DepartmentPage'
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
      <Route path='/department' element={<DepartmentPage/>} />
      <Route path='/universitynews' element={<UniversityNews/>} />
      <Route path='/researchnews' element={<ResearchNews/>} />
    
     </Routes>
    </>
  )
}

export default App
