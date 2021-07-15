import axios from 'axios';
const PAGE_URL = "http://localhost:3000/api/v1/pages";

export interface Note {
  _id?: String;
  title: String;
  type: String;
  content: String;
}

const request = axios.create({
  timeout: 5000
});

request.interceptors.request.use((config) => {
  config.headers['Authorization'] = localStorage.getItem("key");
  return config;
})

export const getAllNotes = async (): Promise<[Note]> => {
  const response = await request.get(PAGE_URL);
  return response.data.pages;
}

export const insertNote = async (note: Note): Promise<Note> => {
  const response = await request.post(PAGE_URL, note);
  return response.data.page;
}

export const findNote = async (id: string): Promise<Note> => {
  const response = await request.get(`${PAGE_URL}/${id}`);
  return response.data.page;
}

export const updateNote = async (note: Note): Promise<Note> => {
  const response = await request.put(`${PAGE_URL}/${note._id}`, note);
  return response.data.page;
}