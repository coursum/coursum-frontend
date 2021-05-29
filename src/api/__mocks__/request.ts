import { courseDataMock, courseDatasMock } from '../../../tests/data';

import { ValidIdParams } from '@/assets/CourseInfo';

const request: { 'fetchAndStoreCourses': Function } = jest.genMockFromModule('request');

async function fetchAndStoreCourses(query: string) {
  return courseDatasMock;
}

async function fetchAndStoreCourse(query: string) {
  return courseDataMock;
}

async function fetchAndStoreCourseForTimetable(query: string) {
  return courseDatasMock;
}

async function fetchAndStoreCoursesForTimetable(idObjs: ValidIdParams[]) {
  return courseDataMock;
}

request.fetchAndStoreCourses = fetchAndStoreCourses;
request.fetchAndStoreCourses = fetchAndStoreCourse;
request.fetchAndStoreCourses = fetchAndStoreCourseForTimetable;
request.fetchAndStoreCourses = fetchAndStoreCoursesForTimetable;

module.exports = request;
