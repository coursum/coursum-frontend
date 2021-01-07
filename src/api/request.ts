import axios from 'axios';
import { CourseInfo } from '@/assets/CourseInfo';

const url = new URL('http://localhost:8000/search');

export default {
  async fetchData(config: {'query': string}): Promise<CourseInfo[]> {
    let datas: CourseInfo[] = [];
    url.search = config.query;

    console.log(url.href);

    try {
      const response = await axios.get(url.href);

      datas = JSON.parse(JSON.stringify(response.data)).Hits;
    } catch (e) {
      console.error(e.message);
    }

    return datas;
  },
};
