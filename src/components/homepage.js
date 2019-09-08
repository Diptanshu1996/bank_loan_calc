import React, {useState, useEffect} from 'react';
import InputSlider from './input_slider';
import fetchData from '../api/loan_interest';
import SideBar from './side_bar';

export default function Homepage (){
  const [amount, setAmount] = useState(1000)
  const [month, setMonth] = useState(12)
  const [result, setResult] = useState({})
  var arr = JSON.parse(localStorage.getItem("inputValues")) || []

  useEffect(() => {
    fetchData(amount, month).then(value => setResult(value))
    cacheInLS();
  }, [amount, month])

  const cacheInLS = () => {
    var flag = true
    arr = JSON.parse(localStorage.getItem("inputValues")) || []
    // Check for deuplicate values
    arr.map(e => {
      if(e.amount === amount && e.month === month)
        flag = false
    })
    flag && arr.push({"amount": amount, "month": month})
    if(arr.length >= 10){
      delete arr[arr.length - 15]
    }
    flag && localStorage.setItem("inputValues", JSON.stringify(arr.filter(Boolean)))
  }

  const paintResult = () => {
    return(
      <ul className="list-group">
        <li className="list-group-item">Interest Rate: {result.interestRate}</li>
      <li className="list-group-item">monthly Payment: { result.monthlyPayment ? "$" + result.monthlyPayment.amount : ""}</li>
    </ul>
    )
  }

  const fillViaLS = (arg) => {
    setAmount(arg.amount)
    setMonth(arg.month)
  }

  return(
    <div className="container-fluid">
      <h4 className="text-center mb-3">Loan Interest Calculator</h4>
      <div className="row">
        <div className="col-3">
          <SideBar
            cachedValues={arr}
            fillViaLS={fillViaLS}
          />
        </div>
        <div className="col-5">
          <h5>Loan Amount</h5>
          <InputSlider
            min={500}
            max={5000}
            value={amount}
            handler={setAmount}
            label="USD"
          /><br />
        <h5>Loan Duration</h5>
          <InputSlider
            min={6}
            max={24}
            value={month}
            handler={setMonth}
            label="months"
          />
        </div>
        <div className="col-1"></div>
        <div className="col-3">
          <h5 className="text-center">Result</h5>
          {result && paintResult()}
        </div>
      </div>
    </div>
  )
}
