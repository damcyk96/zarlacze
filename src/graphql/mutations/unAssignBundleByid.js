import { gql } from '@apollo/client'

export const UNASSIGN_BUNDLE = gql`
    mutation UnassignBundle($bundleId: ID!){
        unassignBundleId(bundleId: $bundleId) {
            _id
            tagBundles {
                name
                description
            }
        }
    }
`
