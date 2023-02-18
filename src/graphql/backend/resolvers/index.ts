import { Resolvers } from '../../../../gen/graphql/resolvers';
import { Course_coverImageResolver } from './Course/coverImage';
import { Course_defaultEndTimeResolver } from './Course/defaultEndTime';
import { Course_defaultStartTimeResolver } from './Course/defaultStartTime';
import { Course_descriptionPrivateResolver } from './Course/descriptionPrivate';
import { Course_sessionsResolver } from './Course/sessions';
import { CurrentUser_roleResolver } from './CurrentUser/role';
import { Location_clustersResolver } from './Location/clusters';
import { LocationCluster_locationsResolver } from './LocationCluster/locations';
import accountAvatarUpdateResolver from './mutations/accountAvatarUpdate';
import { accountLoginResolver } from './mutations/accountLogin';
import { accountLogoutResolver } from './mutations/accountLogout';
import { accountRoleUpdateResolver } from './mutations/accountRoleUpdate';
import { accountSignupResolver } from './mutations/accountSignup';
import { accountTerminateResolver } from './mutations/accountTerminate';
import { courseAddResolver } from './mutations/courseAdd';
import { courseEditResolver } from './mutations/courseEdit';
import fileUploadResolver from './mutations/fileUpload';
import { sessionAddResolver } from './mutations/sessionAdd';
import { sessionAttendResolver } from './mutations/sessionAttend';
import { sessionAttendReportResolver } from './mutations/sessionAttendReport';
import { sessionDeleteResolver } from './mutations/sessionDelete';
import { sessionEditResolver } from './mutations/sessionEdit';
import { courseResolver } from './queries/course';
import { coursesResolver } from './queries/courses';
import { locationClustersResolver } from './queries/locationClusters';
import { locationsResolver } from './queries/locations';
import { meResolver } from './queries/me';
import { schoolsResolver } from './queries/schools';
import { usersResolver } from './queries/users';
import { Session_attendeesResolver } from './Session/attendees';
import { Session_courseResolver } from './Session/course';
import { Session_endTimeResolver } from './Session/endTime';
import { Session_startTimeResolver } from './Session/startTime';
import { SessionAttendee_userResolver } from './SessionAttendee/user';
import User_avatarResolver from './User/avatar';
import { emailResolver } from './User/email';
import { roleResolver } from './User/role';
import { schoolResolver } from './User/school';

const resolvers: Resolvers = {
  Query: {
    me: meResolver,
    schools: schoolsResolver,
    users: usersResolver,
    locationClusters: locationClustersResolver,
    locations: locationsResolver,
    courses: coursesResolver,
    course: courseResolver,
  },
  Mutation: {
    accountLogin: accountLoginResolver,
    accountSignup: accountSignupResolver,
    accountLogout: accountLogoutResolver,
    accountRoleUpdate: accountRoleUpdateResolver,
    accountTerminate: accountTerminateResolver,
    accountAvatarUpdate: accountAvatarUpdateResolver,
    fileUpload: fileUploadResolver,
    courseAdd: courseAddResolver,
    courseEdit: courseEditResolver,
    sessionAdd: sessionAddResolver,
    sessionAttendReport: sessionAttendReportResolver,
    sessionEdit: sessionEditResolver,
    sessionDelete: sessionDeleteResolver,
    sessionAttend: sessionAttendResolver,
  },
  CurrentUser: {
    avatar: User_avatarResolver,
    school: schoolResolver,
    role: CurrentUser_roleResolver,
  },
  User: {
    avatar: User_avatarResolver,
    email: emailResolver,
    school: schoolResolver,
    role: roleResolver,
  },
  LocationCluster: {
    locations: LocationCluster_locationsResolver,
  },
  Location: {
    clusters: Location_clustersResolver,
  },
  Course: {
    coverImage: Course_coverImageResolver,
    descriptionPrivate: Course_descriptionPrivateResolver,
    sessions: Course_sessionsResolver,
    defaultStartTime: Course_defaultStartTimeResolver,
    defaultEndTime: Course_defaultEndTimeResolver,
  },
  Session: {
    attendees: Session_attendeesResolver,
    course: Session_courseResolver,
    startTime: Session_startTimeResolver,
    endTime: Session_endTimeResolver,
  },
  SessionAttendee: {
    user: SessionAttendee_userResolver,
  },
};

export default resolvers;
