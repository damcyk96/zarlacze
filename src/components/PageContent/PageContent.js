import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Bundles from '../../pages/Bundles/Bundles'
import EntriesWithDatePicker from '../../pages/EntriesWithDatePicker/EntriesWithDatePicker'
import Settings from '../../pages/Settings'
import Login from '../Login'
<<<<<<< HEAD
=======
import EntriesWithDatePicker from '../../pages/EntriesWithDatePicker'
import Bundles from '../Bundles'
import BundlesSettings from '../../pages/BundlesSettings'
>>>>>>> b4bf01a1e21b1c87a109c9ba8e27f918839de621

const PageContent = () => {
  return (
    <Switch>
      <Route path="/" exact component={EntriesWithDatePicker} />
      <Route path="/login" component={Login} />
      <Route path="/bundles" component={Bundles} />
<<<<<<< HEAD
      <Route path="/settings" component={Settings} />
=======
      <Route path="/settings" component={BundlesSettings} />
>>>>>>> b4bf01a1e21b1c87a109c9ba8e27f918839de621
    </Switch>
  )
}

export default PageContent
