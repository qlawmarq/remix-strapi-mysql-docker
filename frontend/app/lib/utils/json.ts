// ./app/utils/readWrite.ts
import fs from "fs";

// JSON file containing books array
const dataPath = `${process.cwd()}/app/data/books.json`;

// function to read file contents
export const read = (path = dataPath) => {
  try {
    let data = fs.readFileSync(path, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log({ error });
    return null;
  }
};

// function to write content to file
export const write = (data: object, path = dataPath) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    let result = read();
    return result;
  } catch (error) {
    console.log({ error });
    return null;
  }
};
