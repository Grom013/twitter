import './App.css';
import Header from './Header/Header.jsx';
import Statistic from './Statistic/Statistic.jsx';
import LastMessages from './LastMessages/LastMessages.jsx';
import TagsBlogs from './TagsBlogs/TagsBlogs.jsx';

function App() {
  return (
      <>
          <Header />
          <Statistic />
          <div className="last-messages-wrapper">
              <LastMessages />
              <TagsBlogs />
          </div>
      </>
  );
}

export default App;
