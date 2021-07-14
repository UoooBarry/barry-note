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
  const content = response.data;
  return content.map((item: Note) => {
    return {
      _id: item._id,
      title: item.title,
      type: item.type,
      content: item.content
    };
  });
}