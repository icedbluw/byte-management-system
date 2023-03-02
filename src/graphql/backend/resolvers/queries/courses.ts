import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

import {
  CourseDateFiltering,
  CourseSortKey,
  QueryResolvers,
} from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';
import requireAuthenticated from '../util/requireAuthenticated';
import { Prisma } from '.prisma/client';
import CourseWhereInput = Prisma.CourseWhereInput;
import { DateTime } from 'luxon';
import CourseWithSessionInfoOrderByWithRelationInput = Prisma.CourseWithSessionInfoOrderByWithRelationInput;
import CourseWithSessionInfoWhereInput = Prisma.CourseWithSessionInfoWhereInput;

export const coursesResolver: QueryResolvers['courses'] = async (
  root,
  args,
  context,
  info
) => {
  await requireAuthenticated(context);

  const { first, after, filter, sortKey, reverse } = args;

  let orderBy: CourseWithSessionInfoOrderByWithRelationInput | undefined =
    undefined;

  switch (sortKey) {
    case CourseSortKey.StartDate: {
      orderBy = {
        firstSessionStartDate: reverse ? 'desc' : 'asc',
      };
      break;
    }
    case CourseSortKey.EndDate: {
      orderBy = {
        lastSessionEndDate: reverse ? 'desc' : 'asc',
      };
      break;
    }
    case CourseSortKey.Name: {
      orderBy = {
        name: reverse ? 'desc' : 'asc',
      };
      break;
    }
    case CourseSortKey.LocationName: {
      orderBy = {
        //@ts-ignore
        defaultLocation: {
          name: reverse ? 'desc' : 'asc',
        },
      };
      break;
    }
  }

  const where: CourseWithSessionInfoWhereInput = {
    OR:
      filter?.searchTerm != null
        ? [
            {
              name: {
                contains: filter.searchTerm,
                mode: 'insensitive',
              },
            },
            {
              defaultLocation: {
                name: {
                  contains: filter.searchTerm,
                  mode: 'insensitive',
                },
              },
            },
          ]
        : undefined,
    firstSessionStartDate:
      filter?.date == CourseDateFiltering.Upcoming
        ? {
            gte: DateTime.now().toJSDate(),
          }
        : undefined,
    lastSessionEndDate:
      filter?.date == CourseDateFiltering.Past
        ? {
            lt: DateTime.now().toJSDate(),
          }
        : undefined,
  };

  const result = await findManyCursorConnection(
    (args) =>
      prisma.courseWithSessionInfo.findMany({
        ...args,
        orderBy,
        where,
      }),
    () =>
      prisma.courseWithSessionInfo.count({
        where,
      }),
    { first, after },
    { resolveInfo: info }
  );

  return result;
};
