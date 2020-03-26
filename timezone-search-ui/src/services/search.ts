import * as axios from 'axios';

export const searchTimezones = async (searchTerm: string): Promise<any> => {
    //TODO remove hardcoded and replace with env
    return await axios.default.get(`http://localhost:3000/timezones?search=${searchTerm}`);
}