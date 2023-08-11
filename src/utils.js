// utils.js
export const calculateAge = (dob) => {
    // konwersja "DD.MM.YYYY" na "YYYY-MM-DD"
    const formattedDOB = dob.split(".").reverse().join("-");
    const birthDate = new Date(formattedDOB);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
  
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
  
    return age;
  };
  
  export const getAgeString = (age) => {
    if (age === 1) return "1 roczek";
  
    const lastDigit = age % 10;
  
    if (lastDigit > 1 && lastDigit < 5 && (age < 10 || age > 20))
      return `${age} lata`;
  
    return `${age} lat`;
  };