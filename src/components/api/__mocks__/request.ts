import { courseDatasMock } from '../../../../tests/data';

const request: {'fetchData': Function} = jest.genMockFromModule('request');

async function fetchData(config: {'query': string}) {
  let data;

  switch (config.query) {
    case 'api/users':
      data = courseDatasMock;
      break;
    default:
      data = null;
  }

  return data;
}

request.fetchData = fetchData;

module.exports = request;
