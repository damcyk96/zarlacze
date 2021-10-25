import React from 'react'
import { Container } from '@mui/material'
import BundlesListWithAdding from '../../components/BundlesListWithAdding/BundlesListWithAdding'
import { ModalStateProvider } from '../../context/modalOpen'
import ModalAddBundle from '../../components/ModalAddBundle/ModalAddBundle'

const Bundles = () => {
  return (
    <Container>
      <ModalStateProvider>
        <BundlesListWithAdding />
        <ModalAddBundle />
      </ModalStateProvider>
    </Container>
  )
}

export default Bundles
