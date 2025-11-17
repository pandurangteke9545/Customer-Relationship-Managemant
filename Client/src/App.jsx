
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Leads from './pages/Leads'
import Activities from './pages/Activities'
import Navbar from './component/Navbar'
import Home from './pages/Home'

function App() {
 
  return (
    <BrowserRouter>
      <div>
        <Navbar/>
      </div>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/register' element = {<Register/>} />
        <Route path='/login' element = {<Login/>} />
        <Route path='/leads' element = {<Leads/>} />
        <Route path='/activities' element = {<Activities/>} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
