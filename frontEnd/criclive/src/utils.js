export const getOverString = (scoreObj) => {
  return scoreObj.ballNumber !== 6
    ? `${scoreObj.overNum}.${scoreObj.ballNumber}`
    : `${scoreObj.overNum + 1}.0`;
};
