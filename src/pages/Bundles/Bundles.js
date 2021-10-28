import React from 'react'
import { Container } from '@mui/material'
import BundlesListWithAdding from '../../components/BundlesListWithAdding/BundlesListWithAdding'
import { AddModalStateProvider } from '../../context/addModalOpen'
import { DetailsModalStateProvider } from '../../context/detailsModalOpen'
import ModalAddBundle from '../../components/ModalAddBundle/ModalAddBundle'
import { ActiveBundlesStateProvider } from '../../context/activeBundles'

const Bundles = () => {
  return (
    <Container>
      <AddModalStateProvider>
        <DetailsModalStateProvider>
          <ActiveBundlesStateProvider>
            <BundlesListWithAdding />
            <ModalAddBundle />
          </ActiveBundlesStateProvider>
        </DetailsModalStateProvider>
      </AddModalStateProvider>
    </Container>
  )
}

export default Bundles
