import React, { Suspense, useEffect } from 'react'
import { Router, Switch } from 'react-router'
import { Provider } from 'mobx-react'
import store from 'stores'

//components
import SignIn from 'containers/Public/SignIn'
import SignUp from 'containers/Public/SignUp'
import PrivatePages from 'containers/Private/PageRoutes'
import history from 'utils/history'
import PublicRoute from 'components/PublicRoute'
import PrivateRoute from 'components/PrivateRoute'
//utils
import { login } from 'utils/login'

const App = () => {
  useEffect(() => {
    //do smth with token logic
    //if !token u will be redirected to LOGIN page
    login('test_JWT')
  }, [])

  return (
    <Suspense fallback={null}>
      <Provider {...store}>
        <Router history={history}>
          <Switch>
            <PublicRoute restricted={true} component={SignIn} path="/login" exact />
            <PublicRoute restricted={true} component={SignUp} path="/register" exact />
            <PrivateRoute component={PrivatePages} path="/" />
          </Switch>
        </Router>
      </Provider>
    </Suspense>
  )
}

export default App
