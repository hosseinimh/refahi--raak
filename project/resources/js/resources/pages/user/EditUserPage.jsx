import { useFormik } from "formik";
import Input from "../../common/input";
import SelectInput from "../../common/SelectInput";

import * as Yup from "yup";
import Province from "../../components/province/Province";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getOneUser, updateUser } from "../../services/user";
import {
    useAuth,
    useAuthActions,
} from "../../components/providers/userProvider/AuthPrivider";
import { useState } from "react";
import { toast } from "react-toastify";
import { getAllTowns } from "../../services/user";

let initialValues = {
    fname: "",
    lname: "",
    natcode: "",
    // porsonnelCode: "",
    mobile: "",
    town_id: "",
    // center: "",
    user_name: "",
    // password: "",
};

const validationSchema = Yup.object({
    fname: Yup.string().required("نام مورد نیاز است"),
    lname: Yup.string().required("نام خانوادگی مورد نیاز است"),
    natcode: Yup.string().required("کد ملی ضروری است").nullable(),
    // porsonnelCode: Yup.string().required("کد پرسنلی ضروری است").nullable(),
    mobile: Yup.string()
        .required("موبایل ضروری است")
        .matches(/^[0-9]{11}$/, "موبایل نامعتبر است")
        .nullable(),
    town_id: Yup.string().required("شهر ضروری است"),
    user_name: Yup.string().required("نام کاربری ضروری است"),
    // password: Yup.string().required("رمز عبور ضروری است"),
    // confirmPassword: Yup.string()
    //     .required("تائید رمز عبور ضروری است")
    //     .oneOf([Yup.ref("password"), null], "پسورد باید تطابق داشته باشد"),
});

const EditUserPage = () => {
    const [townsOptions, setTownsOptions] = useState([]);
    const [formValues, setFormValues] = useState(null);
    // const [result,setResult]=useState(null)
    const navigate = useNavigate();
    const params = useParams();
    const userId = params.id;
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
    //   const auth = useAuth();
    // const setAuth=useAuthActions();

    // useEffect(() => {
    //   if (userId) {
    //     console.log(userId);
    //     const result=getOneUser(userId)
    //       .then((res) =>formik.setValues(res.data.item))
    //       .catch((error)=>console.log(error));
    //       console.log("nagi:",initialValues);
    //       console.log(result);
    //       if (result?.item) {
    //         console.log("naghiiiiiiiiiiii");
    //         initialValues = {
    //             ...initialValues,
    //             name: result.item.name,
    //             family: result.item.family,
    //             natcode: result.item.nationalCode,
    //             porsonnelCode: result.item.porsonnelCode,
    //             mobile: result.item.mobile,
    //             province: result.item.province,
    //             city: result.item.city,
    //             center: result.item.center,
    //             userName: result.item.userName,
    //             password: result.item.password,
    //             confirmPassword: result.item.confirmPassword,
    //         };
    //         formik.setValues(initialValues);
    //     }
    //   }
    // }, []);

    // const editContactFun = async (contact, id) => {
    //   const res = await updateUser(id, contact);
    //   console.log(res.data);
    // };

    // const onSubmit = () => {
    //   if (!auth.name) {
    //     alert("enter all fields");
    //     return;
    //   }
    //   editContactFun(auth, userId);

    //   navigate("/panel/users");
    // };

    const getUser = async () => {
        await getOneUser(userId)
            .then((res) => setFormValues(res.data.userinfo))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        if (isNaN(userId)) {
            navigate(`/panel`);

            return;
        }
        // getOneUser()
        getUser();
    }, []);
    console.log(formValues);

    const onSubmit = async (values) => {
        console.log(userId, values);
        console.log("update:", userId);
        const { data } = await updateUser(userId, values);
        console.log(data);

        toast.success(data._message);
        navigate(`/panel/users`);
    };

    const formik = useFormik({
        initialValues: formValues || initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,
        enableReinitialize: true,
    });
    return (
        <div className="px-10 font-IRANSansWeb">
            <h2 className="mt-10 text-lg font-medium intro-y">ویرایش کاربر</h2>
            <form
                className="flex flex-wrap max-w-[850px] "
                onSubmit={formik.handleSubmit}
            >
                {/* <Province /> */}
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
                    name="natcode"
                    type="number"
                    placeholder="لطفا کد ملی خود را وارد نمائید"
                    label="کد ملی"
                    formik={formik}
                />
                {/* <Input
                    name="porsonnelCode"
                    placeholder="لطفا کد پرسنلی خود را وارد نمائید"
                    label="کد پرسنلی"
                    formik={formik}
                /> */}
                <Input
                    name="mobile"
                    placeholder="لطفا موبایل خود را وارد نمائید"
                    label="موبایل"
                    formik={formik}
                />
                 <SelectInput
                    formik={formik}
                    label="شهر"
                    name="town_id"
                    selectOptions={townsOptions}
                /> 
                <Input
                    label="نام کاربری"
                    formik={formik}
                    name="user_name"
                    placeholder="لطفا نام کاربری خود را وارد نمائید"
                />  
            <Input
                    label="تغییر رمز عبور"
                    formik={formik}
                    name="password"
                    type="password"
                    placeholder="لطفا رمز عبور خود را تغییر دهید"
                />   
                {/* <Input
                    label="تائید رمز عبور"
                    formik={formik}
                    name="confirmPassword"
                    type="password"
                    placeholder="لطفا رمز عبور خود را تکرار نمائید"
                /> */}
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

export default EditUserPage;
