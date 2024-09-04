import './App.css';
import Header from './Header/Header.jsx';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import FeedPage from './FeedPage/FeedPage.jsx';

function App() {
      const navigate = useNavigate()
      useEffect(()=>{
            const token = Cookies.get('token')
            if(token){
                  console.log(token);
                  navigate('/feed')
                  
            }
      },[navigate])
      return (
            <>
                  <Routes>
                        <Route path='/' element={<Header/>}/>
                        <Route  path='/feed' element={<FeedPage/>}/>
                  </Routes>
            </>
      );
}

export default App;
