import { gql } from '@apollo/client';

import {
  UserEditInput,
  UserEditPayload,
} from '../../../../gen/graphql/resolvers';

export interface Data {
  data: UserEditPayload;
}

export interface Variables {
  input: UserEditInput;
}

export const Mutation = gql`
  mutation UserEditMutation($input: UserEditInput!) {
    userEdit(input: $input) {
      clientMutationId
      User {
        id
        email
        firstName
        lastName
        mobileNo
        school {
          name
        }
      }
    }
  }
`;
