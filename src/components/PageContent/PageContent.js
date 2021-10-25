import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Bundles from '../../pages/Bundles/Bundles'
import EntriesWithDatePicker from '../../pages/EntriesWithDatePicker/EntriesWithDatePicker'
import Login from '../Login'
import BundlesSettings from '../../pages/BundlesSettings'

const PageContent = () => {
  return (
    <Switch>
      <Route path="/" exact component={EntriesWithDatePicker} />
      <Route path="/login" component={Login} />
      <Route path="/bundles" component={Bundles} />
      <Route path="/settings" component={BundlesSettings} />
    </Switch>
  )
}

export default PageContent
