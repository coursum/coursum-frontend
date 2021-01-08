import axios from 'axios';
import { CourseInfo } from '@/assets/CourseInfo';

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL || undefined;

export default {
  async fetchCourses(config: { query: string }): Promise<CourseInfo[]> {
    let courses: CourseInfo[] = [];

    try {
      ({ data: { Hits: courses } } = await axios.get(`search?${config.query}`));
    } catch (e) {
      console.error(e.message);
    }

    return courses ?? [];
  },
};
