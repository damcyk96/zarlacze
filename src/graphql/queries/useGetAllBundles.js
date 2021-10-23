import { gql, useQuery } from '@apollo/client'

export const GET_ALL_BUNDLES = gql`
    query getBundles {
        getProfile {
            tagBundles {
                _id
                name
                description
            }
        }
    }
`

export const useGetAllBundles = () => {
    const { data, loading, error } = useQuery(GET_ALL_BUNDLES)

    return { data: data && data.getProfile.tagBundles, loading, error }
}

export default useGetAllBundles
