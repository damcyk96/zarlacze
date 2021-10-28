import { gql, useQuery } from '@apollo/client'

export const GET_ACTIVE_BUNDLES = gql`
    query GetActiveBundles {
        getProfile {
            tagBundles {
                name
                _id
                tags {
                    name
                }
            }
        }
    }
`

export const useGetActiveBundles = () => {
    const { data, loading, error } = useQuery(GET_ACTIVE_BUNDLES)

    return { data: data && data.getProfile.tagBundles, loading, error }
}

export default useGetActiveBundles
