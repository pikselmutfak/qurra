import SignUp from './SignUp';
import SignIn from './SignIn';
import Home from './Home';

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

import { getMe, getMyCodes } from './redux/requests';
import NotFound from './NotFound';
import Land from './Land';
import Edit from './Edit';

const App = () => {

  const localAuth = sessionStorage.getItem('xauth')
  if (localAuth !== null) {
    getMe({
      callback: () => {},
      localAuth
    })

    // getMyCodes({
    //   callback: () => {

    //   }
    // })

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
            <Route path='/edit/:_id' element={<Edit />} />
            <Route path='/land/:identifier' element={<Land />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>


  );
}

export default App;
