import * as fs from "fs";
import * as util from "util";

const asyncReadFile = util.promisify(fs.readFile);

async function readPasswords(file: string) {
  try {
    const data = await asyncReadFile(file, "utf8");
    return data.toString();
  } catch (error) {
    console.error("error reading file ", error);
  }
}

readPasswords("passwords.txt").then((data) => {
  const passwordArray = data.split("\n");
  let validPasswordCount = 0;

  //now that we have chunked entries start parse and validation
  passwordArray.forEach((entry) => {
    const chunks = entry.split(" ");
    //now collect proper data (could probably use regex capture groups here, but i honestly dont know enough yet)
    const range = (chunks[0] && chunks[0].split("-")) || [0, 0];
    const passwordChar = (chunks[1] && chunks[1][0]) || "";

    //there is probably an obvious regex answer here. But until I can study more lets do it old school O(N) way
    let count = 0;
    //check every char to see if it matches rule check char
    chunks[2].split('').forEach(char => {
      if(char === passwordChar) count++;
    })
    if(count >= range[0] && count <= range[1]) {
      validPasswordCount++;
    }
  });

  console.log(validPasswordCount);
});

