import Login from '../Pages/Login'
import Home from '../Pages/Home'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../Pages/Register'
import Uji1 from '../test/uji1'
import Uji2 from '../test/uji2'
import AddMenu from '../Pages/AddMenu'

const App = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='add-menu' element={<AddMenu/>}/>
        <Route path='/uji1' element={<Uji1/>}/>
        <Route path='/uji2' element={<Uji2/>}/>
        
    </Routes>
)
}

export default App