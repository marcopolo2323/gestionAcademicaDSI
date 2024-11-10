import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomeComponent  from './components/homeComponent/HomeComponent'
import UserFrom from './usuario/UserFrom'
import Login from './usuario/Login'


function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path="/home" element={<HomeComponent/>} />
        <Route path='/registro' element={<UserFrom/>} />
        
        
      </Routes>


    </BrowserRouter>
      
    </>
  )
}


export default App
