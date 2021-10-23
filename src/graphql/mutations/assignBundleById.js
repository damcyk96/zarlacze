import { gql } from '@apollo/client'

export const ASSIGN_BUNDLE = gql`
    mutation AssignBundle($bundleId: ID!){
        assignBundleId(bundleId: $bundleId) {
            _id
            tagBundles {
                name
                description
            }
        }
    }
`
