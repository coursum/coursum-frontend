import { courseDatasMock } from '../../../tests/data';

const request: { 'fetchAndStoreCourses': Function } = jest.genMockFromModule('request');

async function fetchAndStoreCourses(config: { 'query': string }) {
  return courseDatasMock;
}

request.fetchAndStoreCourses = fetchAndStoreCourses;

module.exports = request;
