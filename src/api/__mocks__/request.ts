import { courseDatasMock } from '../../../tests/data';

const request: {'fetchData': Function} = jest.genMockFromModule('request');

async function fetchData(config: {'query': string}) {
  return courseDatasMock;
}

request.fetchData = fetchData;

module.exports = request;
