import logo from './logo.svg';
import './App.css';

import Button from './Button'

import List from './List';
import ListDetail from './ListDetail';

import Demo from './Demo';
import DemoInput from './DemoInput';
import DemoSelect from './DemoSelect';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import {
  store
} from './redux/store'

import {
  Provider
} from 'react-redux'

const App = () => {
  return (

    <div style={{
      padding: 10
    }}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<List />} />
            <Route path='/detail/:_id' element={<ListDetail />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>


  );
}

export default App;
