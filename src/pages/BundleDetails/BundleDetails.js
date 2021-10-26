import React from 'react'
import { Container } from '@mui/material'
import BundlesListWithAdding from '../../components/BundlesListWithAdding/BundlesListWithAdding'
import { AddModalStateProvider } from '../../context/addModalOpen'
import { DetailsModalStateProvider } from '../../context/detailsModalOpen'
import ModalAddBundle from '../../components/ModalAddBundle/ModalAddBundle'
import BundleDetails from '../../components/BundleDetails/BundleDetails'

const Bundles = () => {
  return (
    <Container>
      <AddModalStateProvider>
        <DetailsModalStateProvider>
          <BundleDetails />
        </DetailsModalStateProvider>
      </AddModalStateProvider>
    </Container>
  )
}

export default Bundles
