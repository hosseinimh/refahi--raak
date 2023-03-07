import { Field, useFormik } from "formik";
import Input from "../../common/input";
import SelectInput from "../../common/SelectInput";

import * as Yup from "yup";
import Province from "../../components/province/Province";
import { addUser } from "../../services/user";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllTowns } from "../../services/user";
import { toast } from "react-toastify";

// const provinceOptions = [
//     { id: 2, value: "خراسان رضوی", title: "خراسان رضوی" },
//     { id: 3, value: "خراسان شمالی", title: "خراسان شمالی" },
//     { id: 4, value: "خراسان جنوبی", title: "خراسان جنوبی" },
// ];

const initialValues = {
    fname: "",
    lname: "",
    nationalCode: "",
    porsonnelCode: "",
    mobile: "",
    townid: "",
    center: "",
    userName: "",
    password: "",
    confirmPassword: "",
};

const validationSchema = Yup.object({
    fname: Yup.string().required("نام مورد نیاز است"),
    lname: Yup.string().required("نام خانوادگی مورد نیاز است"),
    nationalCode: Yup.string().required("کد ملی ضروری است").nullable(),
    porsonnelCode: Yup.string().required("کد پرسنلی ضروری است").nullable(),
    mobile: Yup.string()
        .required("موبایل ضروری است")
        .matches(/^[0-9]{11}$/, "موبایل نامعتبر است")
        .nullable(),
    townid: Yup.string().required("شهر ضروری است"),
    userName: Yup.string().required("نام کاربری ضروری است"),
    password: Yup.string().required("رمز عبور ضروری است"),
    confirmPassword: Yup.string()
        .required("تائید رمز عبور ضروری است")
        .oneOf([Yup.ref("password"), null], "پسورد باید تطابق داشته باشد"),
});

const NewUserPage = () => {
   
    const [townsOptions, setTownsOptions] = useState([]);
    useEffect(() => {
        getProvinces();
    }, []);


    const getProvinces = async () => {
        await getAllTowns()
            .then((res) => {
                setTownsOptions(res.data.town_list);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const { fname, lname, mobile, password,townid,userName,nationalCode } = values;
        console.log(values);
        const result = await addUser({
            fname,
            lname,
            mobile,
            password,
            townid,
            userName,
            nationalCode
        });
        console.log(result);
        toast.success(result.data._message);
        navigate(`/panel/users`);
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,
    });

    return (
        <div className="px-10 font-IRANSansWeb">
            <h2 className="mt-10 text-lg font-medium intro-y"> کاربر جدید</h2>
            <form
                className="flex flex-wrap max-w-[850px] "
                onSubmit={formik.handleSubmit}
            >
                <Input
                    name="fname"
                    placeholder="لطفا نام خود را وارد نمائید"
                    label="نام"
                    formik={formik}
                />
                <Input
                    name="lname"
                    placeholder="لطفا نام خانوادگی خود را وارد نمائید"
                    label="نام خانوادگی"
                    formik={formik}
                />
                <Input
                    name="nationalCode"
                    type="number"
                    placeholder="لطفا کد ملی خود را وارد نمائید"
                    label="کد ملی"
                    formik={formik}
                />
                <Input
                    name="porsonnelCode"
                    placeholder="لطفا کد پرسنلی خود را وارد نمائید"
                    label="کد پرسنلی"
                    formik={formik}
                />
                <Input
                    name="mobile"
                    placeholder="لطفا موبایل خود را وارد نمائید"
                    label="موبایل"
                    formik={formik}
                />
                <SelectInput
                    formik={formik}
                    label="شهر"
                    name="townid"
                    selectOptions={townsOptions}
                />
                {/* 
                <div className="flex flex-col mt-2 w-full md:ml-5 md:w-[250px]">
                    <label className="intro-x text-slate-600 mb-1 text-sm">
                        استان
                    </label>
                    <select
                        name="province"
                        onChange={async (event) => {
                            const _provinces = await getProvinces(
                                event.target.value
                            );
                            formik.setFieldValue(
                                "province",
                                event.target.value
                            );
                            formik.setFieldValue("city", "");
                            formik.setFieldValue("provinces", _provinces);
                        }}
                        // onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="province"
                        className="w-full block text-sm shadow-sm border border-slate-200 rounded-md mb-1 px-4 py-3 placeholder:text-slate-400/90 placeholder:text-xs focus:ring-4 focus:ring-primaryOne focus:ring-opacity-20 focus:border-primaryOne focus:border-opacity-40 focus-visible:outline-0 intro-x "
                    >
                        <option value="None">انتخاب استان</option>
                         {provinceOptions.map((item) => (
                            <option value={item.title} key={item.id}>
                                {item.title}
                            </option>
                        ))} 
                    </select>

                    {formik.touched.province && formik.errors.province && (
                        <div className="text-red-500 text-xs font-semibold col-start-2 col-end-3 ">
                            {formik.errors.province}
                        </div>
                    )}
                </div>
                <div className="flex flex-col mt-2 w-full md:ml-5 md:w-[250px]">
                    <label className="intro-x text-slate-600 mb-1 text-sm">
                        شهرستان
                    </label>
                    <select
                        name="city"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="city"
                        className="w-full block text-sm shadow-sm border border-slate-200 rounded-md mb-1 px-4 py-3 placeholder:text-slate-400/90 placeholder:text-xs focus:ring-4 focus:ring-primaryOne focus:ring-opacity-20 focus:border-primaryOne focus:border-opacity-40 focus-visible:outline-0 intro-x "
                    >
                        <option value="None">انتخاب شهر</option>
                        {formik.values.provinces &&
                            formik.values.provinces.map((r) => (
                                <option key={r.id} value={r.value}>
                                    {r.title}
                                </option>
                            ))}
                    </select>

                    {formik.touched.province && formik.errors.province && (
                        <div className="text-red-500 text-xs font-semibold col-start-2 col-end-3 ">
                            {formik.errors.province}
                        </div>
                    )}
                </div> */}
                <Input
                    label="نام کاربری"
                    formik={formik}
                    name="userName"
                    placeholder="لطفا نام کاربری خود را وارد نمائید"
                />
                <Input
                    label="رمز عبور"
                    formik={formik}
                    name="password"
                    type="password"
                    placeholder="لطفا رمز عبور خود را وارد نمائید"
                />
                <Input
                    label="تائید رمز عبور"
                    formik={formik}
                    name="confirmPassword"
                    type="password"
                    placeholder="لطفا رمز عبور خود را تکرار نمائید"
                />
                <button
                    type="submit"
                    disabled={!formik.isValid}
                    className=" outline-none w-[200px] border-none rounded text-white bg-primaryOne mt-4 p-2 cursor-pointer disabled:border-[#999999] disabled:bg-[#cccccc] disabled:text-[#666666] disabled:cursor-not-allowed"
                >
                    تائید
                </button>
            </form>
        </div>
    );
};

export default NewUserPage;

// const getProvinces = (province) => {
//     // Simulate async call
//     return new Promise((resolve, reject) => {
//         switch (province) {
//             case "خراسان رضوی":
//                 resolve([
//                     { id: 1, title: "بردسکن", value: "بردسکن" },
//                     { id: 2, title: "تایباد", value: "تایباد" },
//                     { id: 3, title: "تربت جام", value: "تربت جام" },
//                     { id: 4, title: "تربت حیدریه", value: "تربت حیدریه" },
//                     { id: 5, title: "چناران", value: "چناران" },
//                     { id: 6, title: "خلیل‌آباد", value: "خلیل‌آباد" },
//                     { id: 7, title: "خواف", value: "خواف" },
//                 ]);
//                 break;
//             case "خراسان شمالی":
//                 resolve([
//                     { id: 1, title: "اسفراین", value: "اسفراین" },
//                     { id: 2, title: "بجنورد", value: "بجنورد" },
//                     { id: 3, title: "جاجرم", value: "جاجرم" },
//                     { id: 4, title: "شیروان", value: "شیروان" },
//                     { id: 5, title: "فاروج", value: "فاروج" },
//                     {
//                         id: 6,
//                         title: "مانه و سملقان",
//                         value: "مانه و سملقان",
//                     },
//                 ]);
//                 break;
//             default:
//                 resolve([]);
//         }
//     });
// };
