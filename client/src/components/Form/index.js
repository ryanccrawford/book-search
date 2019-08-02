import React from "react";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
      <div className="col">
      <input className="form-control" {...props}
          />
   </div>
  );
}

export function TextArea(props) {
  return (
    <div className="form-group col">
      <textarea className="form-control" rows="20" {...props} />
    </div>
  );
}

export function FormBtn(props) {
    return (
        <div className="col-m3">
            <button {...props} className="form-control text-small btn btn-success">
                    {props.children}
            </button>
        </div>
  );
}
