import * as axios from "axios";

export const searchTimezones = async (searchTerm: string): Promise<any> => {
    try {
        return await axios.default.get(`${process.env.REACT_APP_API_ENDPOINT}/timezones?search=${searchTerm}`);
    } catch (error) {
        if (error.response) {
            return { data: ["Invalid search term! Please stick to letters and numbers."] };
        } else {
            return { data: ["Something went wrong. :("]};
        }
    }
}