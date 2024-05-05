import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import UniversityNews from './Pages/Home/UniversityNews'
import ResearchNews from './Pages/Home/ResearchNews'
import FeaturedContent from './Pages/Home/FeaturedContent'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import StudentPage from './Pages/User/StudentPage'
import Holiday from './Pages/User/Holiday'
import Supplier from './Pages/User/Supplier'
import StudentList from './Pages/User/StudentList'
import DepartmentPage from './Pages/User/DepartmentPage'
import StaffPage from './Pages/User/StaffPage'
import StaffList from './Pages/User/StaffList'
import LabInstrumentItemPage from './Pages/Inventory/LabInstrumentItemPage'
import StockManagement from './Pages/Inventory/StockManagement'
import InventoryTracking from './Pages/Inventory/InventoryTracking'
import AlertsNotifications from './Pages/Inventory/AlertsNotifications'


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
      <Route path='/featurecontent' element={<FeaturedContent/>} />
      <Route path='/holiday' element={<Holiday/>} />
      <Route path='/supplier' element={<Supplier/>} />
      <Route path='/labInstrumentPage' element={<LabInstrumentItemPage/>} />
      <Route path='/stockManagement' element={<StockManagement/>} />
      <Route path='/inventoryTracking' element={<InventoryTracking/>} />
      <Route path='/alertsNotifications' element={<AlertsNotifications/>} />
    
     </Routes>
    </>
  )
}

export default App
