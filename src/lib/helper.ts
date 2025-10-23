function generateRandomNumericString(length: number) {
  const characters = "0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

export function generateUniqueUserID() {
  const userIDLength = 6;
  const randomNumericString = generateRandomNumericString(userIDLength);
  const userID = `DT-${randomNumericString}`;
  return userID;
}
export function generateUniqueTOPUPID() {
  const userIDLength = 12;
  const randomNumericString = generateRandomNumericString(userIDLength);
  const userID = `DT-TOP-${randomNumericString}`;
  return userID;
}
