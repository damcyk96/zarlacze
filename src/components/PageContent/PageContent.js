import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Bundles from '../../pages/Bundles/Bundles'
import EntriesWithDatePicker from '../../pages/EntriesWithDatePicker/EntriesWithDatePicker'
import BundlesSettings from '../../pages/BundlesSettings'
import BundlesDetailsPage from '../../pages/BundleDetails'

const PageContent = () => {
  return (
    <Switch>
      <Route path="/" exact component={EntriesWithDatePicker} />
      <Route path="/bundles/:bundleId" component={BundlesDetailsPage} />
      <Route path="/bundles" component={Bundles} />
      <Route path="/settings" component={BundlesSettings} />
    </Switch>
  )
}

export default PageContent
