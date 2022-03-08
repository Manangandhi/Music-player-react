import { gql } from "@apollo/client";

export const GET_SONGS = gql`
  query Query($playlistId: Int!, $search: String) {
    getSongs(playlistId: $playlistId, search: $search) {
      title
      photo
      url
      duration
      artist
      _id
    }
  }
`;
