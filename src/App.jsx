import './App.css';
import Header from './Header/Header.jsx';
import Statistic from './Statistic/Statistic.jsx';
import LastMessages from './LastMessages/LastMessages.jsx';
import TagsBlogs from './TagsBlogs/TagsBlogs.jsx';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

function App() {
      useEffect(()=>{
            const token = Cookies.get('token')
            if(token){
                  console.log(token);
                  window.location.replace('/feed')
                  
            }
      },[])
      return (
            <>
                  <Header/>
                  <Statistic />
                  {/* <div className="last-messages-wrapper">
                        <LastMessages />
                        <TagsBlogs />
                  </div> */}
            </>
      );
}

export default App;
