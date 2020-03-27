import * as axios from 'axios';

export const searchTimezones = async (searchTerm: string): Promise<any> => {
    return await axios.default.get(`${process.env.REACT_APP_API_ENDPOINT}/timezones?search=${searchTerm}`);
}