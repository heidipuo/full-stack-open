import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries'

const getAll = async () => {
    const { data } = await axios.get<DiaryEntry[]>(`${baseUrl}`)
    return data;
}

const createEntry = async (entry: NewDiaryEntry) => {
    const response = await axios.post(baseUrl, entry);
    return response.data;
    /*try{
    const response = await axios.post(baseUrl, entry);
    return response.data;
    }catch (error) {
    if (axios.isAxiosError(error)) {
        console.log(error.response?.status)
        return error.response?.data
      } else {
        console.error(error);
      }
}*/
}

export default {
    getAll,
    createEntry
}