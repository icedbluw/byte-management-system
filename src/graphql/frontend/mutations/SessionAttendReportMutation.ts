import { gql } from '@apollo/client';

import {
  SessionAttendInput,
  SessionAttendReportInput,
  SessionAttendReportPayload,
} from '../../../../gen/graphql/resolvers';

export interface Data {
  sessionAttendReport: SessionAttendReportPayload;
}

export interface Variables {
  input: SessionAttendReportInput;
}

export const Mutation = gql`
  mutation SessionAttendReportMutation($input: SessionAttendReportInput!) {
    sessionAttendReport(input: $input) {
      clientMutationId
      sessionAttendee {
        id
        actualAttendance
      }
    }
  }
`;
