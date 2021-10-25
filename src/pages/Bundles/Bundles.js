import React from 'react'
import { Container } from '@mui/material'
import BundlesListWithAdding from '../../components/BundlesListWithAdding/BundlesListWithAdding'
import { AddModalStateProvider } from '../../context/addModalOpen'
import { DetailsModalStateProvider } from '../../context/detailsModalOpen'
import ModalAddBundle from '../../components/ModalAddBundle/ModalAddBundle'
import ModalBundleDetails from '../../components/ModalBundleDetails/ModalBundleDetails'

const Bundles = () => {
  return (
    <Container>
      <AddModalStateProvider>
        <DetailsModalStateProvider>
          <BundlesListWithAdding />
          <ModalAddBundle />
          <ModalBundleDetails />
        </DetailsModalStateProvider>
      </AddModalStateProvider>
    </Container>
  )
}

export default Bundles
