import axios from 'axios';

export const fetchServerStatus = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/server-status`)
        return res.data;
};