const BooleanCheckBox = ({ formik, name, label }) => {
    return (
        <div className="flex flex-col mt-2 w-full md:ml-5 md:w-[250px]">
            <label className="intro-x text-slate-600 mb-1 text-sm">
                نوع بنا
            </label>
            <div className="col-start-2 col-span-3">
                <input
                    type="checkbox"
                    id={name}
                    name={name}
                    value={true}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    checked={formik.values[name]}
                    // className="w-full block text-sm shadow-sm border border-slate-200 rounded-md mb-1 px-4 py-3 placeholder:text-slate-400/90 placeholder:text-xs focus:ring-4 focus:ring-primaryOne focus:ring-opacity-20 focus:border-primaryOne focus:border-opacity-40 focus-visible:outline-0 intro-x "
                />
                <label htmlFor={name}> {label}</label>
            </div>
            {formik.errors[name] && formik.touched[name] && (
                <div className="text-red-500 text-xs font-semibold col-start-2 col-end-3 ">
                    {formik.errors[name]}
                </div>
            )}
        </div>
    );
};

export default BooleanCheckBox;
