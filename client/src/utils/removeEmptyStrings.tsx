function removeEmptyStrings(obj: any) {
    for (let key in obj) {
      if (obj[key] === "") {  
        delete obj[key]; 
      }
    }
    return obj;
  }

  export default removeEmptyStrings