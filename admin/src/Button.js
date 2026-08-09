import React from 'react'

export default function Button() {
  return (
    <div className="button-group">
    <button onClick={()=>handleclick("Pending")}>Pending</button>
    <button onClick={()=>handleclick("Approved")}>Approved</button>
    <button onClick={()=>handleclick("Rejected")}>Rejected</button>

    </div>
  )
}
