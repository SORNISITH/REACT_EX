import { v4 as uuidv4, v4 } from "uuid";

const dataNotes = [
  {
    id: v4(),
    content: "HTML is easy",
    important: true,
  },
  {
    id: v4(),
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: v4(),
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

export default dataNotes;
