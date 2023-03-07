import React from "react";
import Input from "./input";

const CheckBoxInput = ({ checkBoxOptions, name, formik, label,onChange }) => {
    return (
        <div className="flex flex-col mt-2 mb-4 w-full md:ml-5 ">
            <label className="intro-x text-slate-600 mb-1 text-sm">
                {label}
            </label>
            {/* <div className="flex flex-wrap gap-x-6 gap-y-3"> */}
            <div className="flex flex-wrap gap-x-6 gap-y-3">
                {checkBoxOptions.map((item) => (
                    // <div key={item.value} className="flex gap-1">
                    <div key={item.id} className="flex flex-wrap ">
                        <div className="block w-full lg:flex items-center gap-1">
                            <input
                                type="checkbox"
                                id={item.id}
                                name={name}
                                value={item.title}
                                onBlur={formik.handleBlur}
                             
                                // onChange={formik.handleChange}
                                onChange={(e) =>
                                    onChange(e, {
                                        ...item,
                                        title: item.title,
                                        id: item.id,
                                        // code: formik.values["code"],
                                    })
                                }
                                // checked="checked"
                                // checked={formik.values[name].includes(
                                //     item.id
                                // )}
                                className=" text-sm shadow-sm border border-slate-200 rounded-lg focus:ring-4 focus:ring-primaryOne focus:ring-opacity-20 focus:border-primaryOne focus:border-opacity-40 focus-visible:outline-0 intro-x cursor-pointer"
                            />
                            <label
                                htmlFor={item.id}
                                className="text-slate-400/90 intro-x text-sm cursor-pointer"
                            >
                                {item.title}
                            </label>
                        </div>
                        {/* {formik.values[name].find(i=>i.value===item.value) ? (
                            <>
                                <Input
                                    name="ID"
                                    type="number"
                                    placeholder="لطفا تعداد را وارد نمائید"
                                    label="تعداد"
                                    formik={formik}
                                    id={item.value}
                                />
                                <Input
                                    name="phoneID"
                                    placeholder="لطفا کد اموال را وارد نمائید"
                                    label="کد اموال"
                                    formik={formik}
                                    id={item.value}
                                />
                            </>
                        ) : null} */}
                    </div>
                ))}
            </div>

            {formik.errors[name] && formik.touched[name] && (
                <div className="text-red-500 text-xs font-semibold col-start-2 col-end-3 ">
                    {formik.errors[name]}
                </div>
            )}
        </div>
    );
};

export default CheckBoxInput;
