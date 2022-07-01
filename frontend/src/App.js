import { Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Profile from './pages/profile'
import Home from './pages/home'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login></Login>} exact></Route>
        <Route path='/profile' element={<Profile></Profile>} exact></Route>
        <Route path='/' element={<Home></Home>} exact></Route>
      </Routes>
    </div>
  )
}

export default App
