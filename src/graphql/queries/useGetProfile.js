import { gql, useQuery } from '@apollo/client'

export const GET_PROFILE = gql`
  query GetProfile {
    getProfile {
      oauthId
    }
  }
`

export const useGetProfile = () => {
  const { data, loading, error } = useQuery(GET_PROFILE)

  return { data: data && data.getProfile, loading, error }
}

export default useGetProfile
