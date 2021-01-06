import axios from 'axios';
import { CourseInfo } from '@/assets/CourseInfo';

const url = new URL('http://54.248.214.173:8000/search');

export default {
  async fetchData(config: {'query': string}): Promise<CourseInfo[]> {
    let datas: CourseInfo[] = [];
    url.search = `query=${config.query}`;

    try {
      const response = await axios.get(url.href);

      datas = JSON.parse(JSON.stringify(response.data)).Hits;
    } catch (e) {
      console.error(e.message);
    }

    return datas;
  },
};
