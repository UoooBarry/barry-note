import axios from 'axios';
const PAGE_URL = "http://localhost:3000/api/v1/pages";

export interface Note {
  _id: String;
  title: String;
  type: String;
  content: String;
}

export const getAllNotes = async (): Promise<[Note]> => {
  const response = await axios.get(PAGE_URL);
  return response.data.pages;
}

export const insertNote = async (note: Note): Promise<Note> => {
  const response = await axios.post(PAGE_URL, note);
  return response.data.page;
}

export const findNote = async (id: string): Promise<Note> => {
  const response = await axios.get(`${PAGE_URL}/${id}`);
  return response.data.page;
}