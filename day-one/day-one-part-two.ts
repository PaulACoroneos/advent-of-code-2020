const threeSum = (data:number[],target:number) => {

  //first sort array and initialize pointers
  const sortedData = data.sort((a,b) => a-b);

  for(let i =0; i < sortedData.length; i++) {
    const firstVal = data[i];
    let ptra = i+1;
    let ptrb = sortedData.length-1;
    while (ptra < ptrb) {
      const difference = target-sortedData[ptra]-sortedData[ptrb]-firstVal;
      //we exceeded target, move b ptr
      if (difference < 0) {
        ptrb--;
      }
      //we arent big enough, move a ptr
      else if (difference > 0) {
        ptra++;
      }
      else {
        return sortedData[ptra] * sortedData[ptrb] * firstVal;
      }
    }
  }

  //we didnt find a valid 3 sum
  return null
}