const cutDownDate = (longerDate) => {
    const wordsInArray = longerDate?.toString().split(" ");
    const shorterDate = wordsInArray?.slice().splice(0,1)+ ", " + wordsInArray.slice().splice(1,3).join(" ");
    return shorterDate
}

export default cutDownDate;

