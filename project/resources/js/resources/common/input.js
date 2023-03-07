const Input = ({  name, type = "text", formik, placeholder,label }) => {
  return (
    <div className=" flex flex-col mt-2 w-full md:ml-5 md:w-[250px]">
      <label htmlFor={name} className="intro-x text-slate-600 mb-1 text-sm">{label}</label>
      <input
        {...formik.getFieldProps(name)}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full block text-sm shadow-sm border border-slate-200 rounded-md mb-1 px-4 py-3 placeholder:text-slate-400/90 placeholder:text-xs focus:ring-4 focus:ring-primaryOne focus:ring-opacity-20 focus:border-primaryOne focus:border-opacity-40 focus-visible:outline-0 intro-x "
      />
      {formik.touched[name] && formik.errors[name] && (
        <div className="text-red-500 text-xs font-semibold  ">
          {formik.errors[name]}
        </div>
      )}
    </div>
  );
};

export default Input;
