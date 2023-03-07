import React from "react";

const RadioInput = ({ radioOptions, formik, name,label }) => {
  return (
    <div className="grid grid-cols-4 grid-rows-1 gap-x-2 items-center mb-3" >
      <label className="flex-1" >{label}</label>
      {radioOptions.map((item) => (
        <div key={item.value} className="col-start-2 col-span-3 flex items-center">
          <input
            type="radio"
            id={item.value}
            name={name}
            value={item.value}
            checked={formik.values[name] === item.value}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="ml-2"
          />
          <label htmlFor={item.value}>{item.label}</label>
        </div>
      ))}
      {formik.errors[name] && formik.touched[name] && (
        <div className="text-red-500 text-xs font-semibold col-start-2 col-end-3 -mt-10">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default RadioInput;
