import React, { FC } from 'react'
import { observer } from 'mobx-react'
import { Route, Switch } from 'react-router-dom'
import Main from '../Main'

const PrivatePages: FC = observer(() => {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      {/* <Redirect from="/" to={} /> */}
    </Switch>
  )
})

export default PrivatePages
