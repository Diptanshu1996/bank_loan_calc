import React from 'react';
import '../assets/css/side_bar.css'

export default (props) => {
  return(
    <div className="wrapper">
      <nav id="sidebar">
        <div className="sidebar-header">
          <h5>Recent Calculated values</h5>
        </div>

        <ul className="list-group-item components">
          {props.cachedValues.map((e, index) => {
            return(
              <li
                className="list-unstyled pt-1"
                key={index}
                onClick={() => props.fillViaLS(e)}>
                {"LA - $" + e.amount + " , LD - " + e.month + "months"}
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
