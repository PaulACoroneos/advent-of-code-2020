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
    const range = (chunks[0] && chunks[0].split("-")) || Array<string>(2).fill('0');
    const passwordChar = (chunks[1] && chunks[1][0]) || "";

    const matchFirst = chunks[2][Number(range[0])-1] === passwordChar;
    const matchSecond = chunks[2][Number(range[1])-1] === passwordChar;

    const passwordXOR =  matchFirst? !matchSecond: matchSecond;
    if(passwordXOR) validPasswordCount++;
  });

  console.log(validPasswordCount);
});

