import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries'

const getAll = async () => {
    const { data } = await axios.get<DiaryEntry[]>(`${baseUrl}`)
    return data;
}

const createEntry = async (entry: NewDiaryEntry) => {
    await axios.post(baseUrl, entry);
}

export default {
    getAll,
    createEntry
}