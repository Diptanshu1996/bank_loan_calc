export default async (amount, month) => {
  let response = await fetch('https://ftl-frontend-test.herokuapp.com/interest?amount='+ amount + '&numMonths=' + month);
  let data = await response.json()
  return data;
}
