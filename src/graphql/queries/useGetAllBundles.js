import { gql, useQuery } from '@apollo/client'

export const GET_ALL_BUNDLES = gql`
    query GetAllBundles {
        tagBundleMany {
            name
            _id
        }
    }
`

export const useGetAllBundles = () => {
    const { data, loading, error } = useQuery(GET_ALL_BUNDLES)

    return { data: data && data.tagBundleMany, loading, error }
}

export default useGetAllBundles
