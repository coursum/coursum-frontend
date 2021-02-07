import { courseDatasMock } from '../../../tests/data';

const request: { 'fetchCourses': Function } = jest.genMockFromModule('request');

async function fetchCourses(config: { 'query': string }) {
  return courseDatasMock;
}

request.fetchCourses = fetchCourses;

module.exports = request;
