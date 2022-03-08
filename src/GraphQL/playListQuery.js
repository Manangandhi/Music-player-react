import { gql } from "@apollo/client";

export const GET_PLAYLISTS = gql`
  query Query {
    getPlaylists {
      id
      title
    }
  }
`;
