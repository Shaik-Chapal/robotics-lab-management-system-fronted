import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import UniversityNews from './Pages/Home/UniversityNews'
import Profile from './Pages/Home/Profile'
import ResearchNews from './Pages/Home/ResearchNews'
import FeaturedContent from './Pages/Home/FeaturedContent'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import StudentPage from './Pages/User/StudentPage'
import Teacher from './Pages/User/Teacher'
import Holiday from './Pages/User/Holiday'
import Supplier from './Pages/User/Supplier'
import StudentList from './Pages/User/StudentList'
import TeacherList from './Pages/User/TeacherList'
import University from './Pages/User/University'
import DepartmentPage from './Pages/User/DepartmentPage'
import DepartmentList from './Pages/User/DepartmentList'
import StaffPage from './Pages/User/StaffPage'
import StaffList from './Pages/User/StaffList'
import LabInstrumentItemPage from './Pages/Inventory/LabInstrumentItemPage'
import GroupScreen from './Pages/Inventory/GroupScreen'
import PurchaseOrder from './Pages/Inventory/PurchaseOrder'
import EquipmentManagementScreen from './Pages/Inventory/EquipmentManagementScreen'
import InventoryTracking from './Pages/Inventory/InventoryTracking'
import AlertsNotifications from './Pages/Inventory/AlertsNotifications'
import InventoryControl from './Pages/Inventory/InventoryControl'
import SchedulingModule from './Pages/Communication/SchedulingModule'
import MessageSystem from './Pages/Communication/MessageSystem'
import Feedback from './Pages/Communication/Feedback'
import EquipmentRequestSystem from './Pages/Lab/EquipmentRequestSystem'
import StudentAddRequest from './Pages/Lab/StudentAddRequest'
import ResourceApproval from './Pages/Lab/ResourceApproval'
import ResultSharing from './Pages/Lab/ResultSharing'
import Resultlist from './Pages/Lab/Resultlist'

function App() {


  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/teacherList' element={<TeacherList/>}/>
      <Route path='/student' element={<StudentPage/>} />
      <Route path='/studentlist' element={<StudentList/>} />
      <Route path='/teacher' element={<Teacher/>} />
      <Route path='/staff' element={<StaffPage/>} />
      <Route path='/university' element={<University/>} />
      <Route path='/stafflist' element={<StaffList/>} />
      <Route path='/department' element={<DepartmentPage/>} />
      <Route path='/departmentList' element={<DepartmentList/>} />
      <Route path='/universitynews' element={<UniversityNews/>} />
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/researchnews' element={<ResearchNews/>} />
      <Route path='/featurecontent' element={<FeaturedContent/>} />
      <Route path='/holiday' element={<Holiday/>} />
      <Route path='/supplier' element={<Supplier/>} />
      <Route path='/labInstrumentPage' element={<LabInstrumentItemPage/>} />
      <Route path='/stockManagement' element={<EquipmentManagementScreen/>} />
      <Route path='/inventoryTracking' element={<InventoryTracking/>} />
      <Route path='/alertsNotifications' element={<AlertsNotifications/>} />
      <Route path='/schedulingModule' element={<SchedulingModule/>} />
      <Route path='/messageSystem' element={<MessageSystem/>} />
      <Route path='/feedback' element={<Feedback/>} />
      <Route path='/groupScreen' element={<GroupScreen/>} />
      <Route path='/purchaseOrder' element={<PurchaseOrder/>} />
      <Route path='/inventoryControl' element={<InventoryControl/>} />
      <Route path='/equipmentRequestSystem' element={<EquipmentRequestSystem/>} />
      <Route path='/resourceApproval' element={<ResourceApproval/>} />
      <Route path='/resultSharing' element={<ResultSharing/>} />
      <Route path='/studentAddRequest' element={<StudentAddRequest/>} />
      <Route path='/resultlist' element={<Resultlist/>} />
      
     </Routes>
    </>
  )
}

export default App
