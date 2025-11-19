
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Leads from './pages/Leads'
import Activities from './pages/Activities'
import Navbar from './component/Navbar'
import Home from './pages/Home'
import AddLead from './pages/AddLead'
import EditLead from './pages/EditLead'
import ViewLead from './pages/ViewLead'
import AddActivity from './pages/AddActivity'
import ViewActivity from './pages/ViewActivity'
import EditActivity from './pages/EditActivity'

function App() {
 
  return (
    <BrowserRouter>
      <div>
        <Navbar/>
      </div >
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/register' element = {<Register/>} />
        <Route path='/login' element = {<Login/>} />
        <Route path='/leads' element = {<Leads/>} />
        <Route path='/lead/addlead' element = {<AddLead/>} />
        <Route path='/lead/view/:id' element = {<ViewLead/>} />
        <Route path='/lead/edit/:id' element = {<EditLead/>} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/activities/add" element={<AddActivity />} />
        <Route path="/activities/view/:id" element={<ViewActivity />} />
        <Route path="/activities/edit/:id" element={<EditActivity />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
