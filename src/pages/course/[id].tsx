import { useMutation, useQuery } from '@apollo/client';
import { ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { DateTime } from 'luxon';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  Attendance,
  SessionDateFiltering,
  SessionSortKey,
} from '../../../gen/graphql/resolvers';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import RichTextEditor from '../../components/RichTextEditor';
import SEO from '../../components/SEO';
import Spinner from '../../components/Spinner';
import * as SessionAttend from '../../graphql/frontend/mutations/SessionAttendMutation';
import * as CourseSessionsQuery from '../../graphql/frontend/queries/CourseSessionsQuery';
import * as MeSessionAttendeesQuery from '../../graphql/frontend/queries/MeSessionAttendeesQuery';
import AppLayout from '../../layouts/AppLayout';
import SessionButton from './components/SessionButton';

const first = 10;

const CourseDetailPage: React.FC = function () {
  const router = useRouter();
  const { id } = router.query;

  const [reverse, setReverse] = React.useState(false);

  const [linkSelected, setLinkSelected] = React.useState<
    'Apply' | 'Description' | 'Volunteer Instructions'
  >('Apply');

  const { data, loading, error, fetchMore } = useQuery<
    CourseSessionsQuery.Data,
    CourseSessionsQuery.Variables
  >(CourseSessionsQuery.Query, {
    variables: {
      id: id as string,
      reverse,
      sortKey: SessionSortKey.Start,
      first,
      filter: {
        date: SessionDateFiltering.Upcoming,
      },
    },
    skip: id == null,
  });

  const [updateSession] = useMutation<
    SessionAttend.Data,
    SessionAttend.Variables
  >(SessionAttend.Mutation);

  const meCourseInfo = useQuery<
    MeSessionAttendeesQuery.Data,
    MeSessionAttendeesQuery.Variables
  >(MeSessionAttendeesQuery.Query);
  const attendingSessions = meCourseInfo.data?.me.sessionAttendees.edges ?? [];
  const attendingSessionsIdArr: string[] = [];

  for (const session of attendingSessions) {
    if (session.node.indicatedAttendance == 'attend') {
      attendingSessionsIdArr.push(session.node.sessionId);
    }
  }

  const course = data?.course ?? null;

  const handleLoadMoreClick: React.MouseEventHandler = () => {
    const endCursor = data?.course?.sessions?.pageInfo?.endCursor;

    fetchMore({
      variables: {
        after: endCursor,
      },
    });
  };

  const updateIndicatedAttendance = (
    indicatedAttendance: Attendance,
    sessionId: string
  ) => {
    updateSession({
      variables: {
        input: {
          clientMutationId: uuidv4(),
          indicatedAttendance,
          sessionId,
        },
      },
    });
  };

  React.useEffect(() => {
    if (id == null || loading) {
      return;
    }

    if (data != null || error != null) {
      return;
    }

    router.push('/404');
  }, [data, error, id, loading, router]);

  return (
    <>
      <AppLayout>
        <div className="mx-5 mb-12 flex w-auto flex-col justify-between sm:mx-auto sm:w-11/12 md:w-4/5">
          <h6 className="text-secondary my-9">
            <BackButton
              href="/discover-courses"
              text="Back to Discover Classes"
            />
          </h6>
          <div className="relative mx-auto mb-9 h-[30vh] w-full">
            <Image
              src={course?.coverImage ?? '/default-cover-image.jpg'}
              alt="cover picture"
              fill
              className="rounded-3xl"
            />
          </div>
          <SEO title={course?.name ?? 'Course'} />
          {loading && <Spinner />}
          {error != null && (
            <span className="text-red-400">{error.message}</span>
          )}
          {course != null && (
            <div className="flex flex-col justify-between gap-9 xl:flex-row xl:gap-14">
              <div className="basis-2/3">
                <h6 className="mb-6">
                  {course.firstSessionStartDate != null &&
                  course.lastSessionEndDate != null ? (
                    <>
                      From{' '}
                      {DateTime.fromISO(
                        course.firstSessionStartDate ?? ''
                      ).toLocaleString(DateTime.DATE_MED)}{' '}
                      -{' '}
                      {DateTime.fromISO(
                        course.lastSessionEndDate ?? ''
                      ).toLocaleString(DateTime.DATE_MED)}
                    </>
                  ) : (
                    <>No sessions</>
                  )}
                </h6>
                <h2 className="mb-6">{course.name}</h2>
                <div className="subtitle1 mb-5">{course.subtitle}</div>
                <div>
                  <div className="flex gap-4">
                    <div
                      onClick={() => setLinkSelected('Apply')}
                      className={classNames(
                        {
                          'border-b-2 border-brand-main text-brand-main':
                            linkSelected === 'Apply',
                          'text-secondary': linkSelected !== 'Apply',
                        },
                        'cursor-default px-4 py-3 group-hover:text-brand-main'
                      )}
                    >
                      Apply
                    </div>
                    <div
                      onClick={() => setLinkSelected('Description')}
                      className={classNames(
                        {
                          'border-b-2 border-brand-main text-brand-main':
                            linkSelected === 'Description',
                          'text-secondary': linkSelected !== 'Description',
                        },
                        'cursor-default px-4 py-3 group-hover:text-brand-main'
                      )}
                    >
                      Description
                    </div>
                    <div
                      onClick={() => setLinkSelected('Volunteer Instructions')}
                      className={classNames(
                        {
                          'border-b-2 border-brand-main text-brand-main':
                            linkSelected === 'Volunteer Instructions',
                          'text-secondary':
                            linkSelected !== 'Volunteer Instructions',
                        },
                        'cursor-default px-4 py-3 group-hover:text-brand-main'
                      )}
                    >
                      Instructions for volunteers
                    </div>
                  </div>
                  <div className="border-full mb-5 block w-full rounded-lg border bg-white shadow-lg">
                    {linkSelected === 'Apply' && (
                      <>
                        <div className="snap-x overflow-x-auto scroll-smooth">
                          <table className="sm: w-full md:w-full lg:w-full">
                            <thead>
                              <tr>
                                <th className="whitespace-nowrap border-b border-slate-300 py-4 pl-4 text-left">
                                  <div className="subtitle2 flex items-center gap-1.5">
                                    <span>Date</span>
                                    <span>
                                      <ArrowsUpDownIcon
                                        className={classNames(
                                          'hover:text-secondary h-5 w-5 hover:cursor-pointer',
                                          {
                                            'text-gray-400': !reverse,
                                            'text-gray-800': reverse,
                                          }
                                        )}
                                        onClick={() => {
                                          setReverse((prevState) => !prevState);
                                        }}
                                      />
                                    </span>
                                  </div>
                                </th>
                                <th className="whitespace-nowrap border-b border-slate-300 py-4 pl-4 text-left">
                                  <div className="subtitle2 flex items-center gap-1.5">
                                    <span>Start Time</span>
                                    <span>
                                      <ArrowsUpDownIcon
                                        className={classNames(
                                          'hover:text-secondary h-5 w-5 hover:cursor-pointer',
                                          {
                                            'text-gray-400': !reverse,
                                            'text-gray-800': reverse,
                                          }
                                        )}
                                        onClick={() => {
                                          setReverse((prevState) => !prevState);
                                        }}
                                      />
                                    </span>
                                  </div>
                                </th>
                                <th className="whitespace-nowrap border-b  border-slate-300 py-4 pl-4 text-left">
                                  <div className="subtitle2 flex items-center gap-1.5">
                                    <span>End Time</span>
                                    <span>
                                      <ArrowsUpDownIcon
                                        className={classNames(
                                          'hover:text-secondary h-5 w-5 hover:cursor-pointer',
                                          {
                                            'text-gray-400': !reverse,
                                            'text-gray-800': reverse,
                                          }
                                        )}
                                        onClick={() => {
                                          setReverse((prevState) => !prevState);
                                        }}
                                      />
                                    </span>
                                  </div>
                                </th>
                                <th className="whitespace-nowrap border-b border-slate-300 py-4 pl-4 text-left">
                                  <div className="subtitle2 flex items-center gap-1.5">
                                    <span>Available Slots</span>
                                    <span>
                                      <ArrowsUpDownIcon
                                        className={classNames(
                                          'hover:text-secondary h-5 w-5 hover:cursor-pointer',
                                          {
                                            'text-gray-400': !reverse,
                                            'text-gray-800': reverse,
                                          }
                                        )}
                                        onClick={() => {
                                          setReverse((prevState) => !prevState);
                                        }}
                                      />
                                    </span>
                                  </div>
                                </th>
                                <th className="border-b border-slate-300 py-4 px-4 text-left" />
                              </tr>
                            </thead>
                            <tbody>
                              {course.sessions.edges.length === 0 && (
                                <tr>
                                  {/* <p className="px-3 text-secondary">
                                  There are no sessions for this course.
                                </p> */}
                                </tr>
                              )}
                              {course.sessions.edges.map((edge) => (
                                <tr key={edge.cursor}>
                                  <td className="body2 whitespace-nowrap border-b border-slate-300 py-4 pl-4 text-left">
                                    {DateTime.fromISO(
                                      edge.node.startDate
                                    ).toLocaleString(DateTime.DATE_MED)}
                                  </td>
                                  <td className="body2 whitespace-nowrap border-b border-slate-300 py-4 pl-4 text-left">
                                    {DateTime.fromISO(
                                      edge.node.startTime
                                    ).toLocaleString(DateTime.TIME_SIMPLE)}
                                  </td>
                                  <td className="body2 whitespace-nowrap border-b border-slate-300 py-4 pl-4 text-left">
                                    {DateTime.fromISO(
                                      edge.node.endTime
                                    ).toLocaleString(DateTime.TIME_SIMPLE)}
                                  </td>
                                  <td className="body2 whitespace-nowrap border-b border-slate-300 py-4 pl-4 text-left">
                                    {edge.node.volunteerSlotAvailableCount ??
                                      'Unlimited'}
                                  </td>
                                  <td className="whitespace-nowrap border-b border-slate-300 py-4 px-4 text-center">
                                    {attendingSessionsIdArr.includes(
                                      edge.node.id
                                    ) ? (
                                      <SessionButton
                                        className="mr-3"
                                        size="sm"
                                        variant="secondary"
                                        onClick={() => {
                                          updateIndicatedAttendance(
                                            Attendance.Absent,
                                            edge.node.id
                                          );
                                        }}
                                      />
                                    ) : (
                                      <Button
                                        size="sm"
                                        label="Apply"
                                        onClick={() => {
                                          updateIndicatedAttendance(
                                            Attendance.Attend,
                                            edge.node.id
                                          );
                                        }}
                                      />
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="flex items-center justify-end gap-6 px-3">
                          {course.sessions.pageInfo.hasNextPage && (
                            <button onClick={handleLoadMoreClick}>
                              Load more
                            </button>
                          )}
                          <div>
                            {Math.min(course.sessions.totalCount, 1)} -{' '}
                            {course.sessions.edges.length} of{' '}
                            {course.sessions.totalCount}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  {linkSelected === 'Description' && (
                    <RichTextEditor
                      className="px-4"
                      value={course.description}
                      toolbarDisabled
                      readonly
                    />
                  )}
                  {linkSelected === 'Volunteer Instructions' && (
                    <RichTextEditor
                      className="mb-4 px-4"
                      value={
                        course.descriptionPrivate ||
                        'There are no instructions available.'
                      }
                      toolbarDisabled
                      readonly
                    />
                  )}
                </div>
              </div>
              <div className="basis-1/3">
                <div className="border-full mb-5 block w-full rounded-lg border bg-white p-10 shadow-lg">
                  <div className="subtitle1 mb-2.5">LOCATION</div>
                  <div className="mb-2.5">INSERT MAP HERE</div>
                  <div className="body1 mb-8">
                    {course.defaultLocation?.address}
                  </div>
                  <div className="subtitle1 mb-2.5">TRAINER(S) DETAILS</div>
                  <div className="body1">
                    <p className="items-center">
                      <div className="grid grid-cols-[100px_1fr]">
                        <div className="flex">
                          <Image
                            className="h-10 w-10 rounded-full"
                            src="/favicon.ico"
                            alt="Rounded avatar"
                            width={100}
                            height={100}
                          />
                          <div className="ml-4 text-left">
                            {course.courseManagers.edges.map((edge) => (
                              <div key={edge.cursor}>
                                <span>
                                  {edge.node.user.firstName}{' '}
                                  {edge.node.user.lastName}
                                </span>
                                <br />
                                <span className="" key={edge.cursor}>
                                  {edge.node.user.email}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </AppLayout>
    </>
  );
};

export default CourseDetailPage;
