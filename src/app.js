import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Test from './components/view/test.jsx'

const App = () => {
  
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={Test}
      />
    </Switch>
  )
}

export default App