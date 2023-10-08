import Button from './Button'

import List from './List';
import ListDetail from './ListDetail';

import SignUp from './SignUp';
import SignIn from './SignIn';
import Home from './Home';

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

import { setXAuth } from './redux/userSlice';

import { getMe } from './redux/requests';

const App = () => {

  const localAuth = sessionStorage.getItem('xauth')
  if (localAuth !== null) {
    getMe({
      callback: () => {},
      localAuth
    })
  }

  return (

    <div style={{
      padding: 10
    }}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/detail/:_id' element={<ListDetail />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>


  );
}

export default App;
