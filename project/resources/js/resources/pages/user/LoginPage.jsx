import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import communication from "../../images/communication.png";
import Input from "../../common/input";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useQuery } from "../../hooks/useQuery";
import { loginUser } from "../../services/user";
import {
    useAuth,
    useAuthActions,
} from "../../components/providers/userProvider/AuthPrivider";

const initialValues = {
    // email: "",
    mobile: "",
    password: "",
};

const validationSchema = Yup.object({
    mobile: Yup.string().required("نام کاربری مورد نیاز است"),
    // email: Yup.string().email("ایمیل وجود ندارد").required("ایمیل مورد نیاز است"),
    password: Yup.string().required("پسورد مورد نیاز است"),
});

const LoginPage = () => {
    const query = useQuery();
    const redirect = query.get("redirect") || "panel/dashboard";
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const auth = useAuth();
    const setAuth = useAuthActions();

    useEffect(() => {
        if (auth) navigate(`/${redirect}`);
    }, [redirect, auth]);
    const onSubmit = async (values) => {
        try {
            const { data } = await loginUser(values);
            if (data._result !== "1") {
                setError(data._message);
                return;
            }
            setAuth(data);
            setError(null);
            navigate(`/${redirect}`);
        } catch (error) {
            console.log("darya");
            console.log(error);
        }
    };

    const formik = useFormik({ initialValues, onSubmit, validationSchema });
    return (
        <div
            className="h-screen relative bg-primaryOne xl:bg-white  lg:overflow-hidden before:hidden before:xl:block before:content-[''] before:absolute before:w-[57%] before:right-0 before:-mt-[28%] before:-mb-[16%] before:-mr-[13%] before:bg-primaryOne/20 before:inset-y-0 before:transform before:rotate-[-4.5deg] before:rounded-[100%] after:content-[''] after:w-[57%] after:hidden after:xl:block after:rounded-[100%] after:-mr-[13%] after:-mb-[13%]
        after:-mt-[20%] after:bg-primaryOne after:absolute after:inset-y-0 after:right-0 after:transform after:rotate-[-4.5deg]"
        >
            <div className="container relative px-10 z-10 font-IRANSansWeb">
                <div className="flex p-4">
                    {/* section One */}
                    <div className=" min-h-screen flex-1 flex-col hidden xl:flex  ">
                        <Link
                            href="#"
                            className="flex items-center text-white pt-5 -intro-x"
                        >
                            <img
                                src={logo}
                                alt="logo"
                                className="w-10 h-10 ml-5 "
                            />
                            <span>سامانه مدیریت املاک شرکت مخابرات منطقه خراسان رضوی</span>
                        </Link>
                        <div className="my-auto">
                            <img
                                src={communication}
                                alt=""
                                className="-intro-x"
                            />
                            <div className="text-white font-medium text-3xl mt-10 -intro-x ">
                                به حساب خود وارد شوید
                            </div>
                            <br />
                            <br />
                            <br />
                            <br />
                        </div>
                    </div>
                    {/* section LoginForm */}
                    <div className=" h-screen flex-1 py-5 my-10 flex xl:h-auto xl:py-0 xl:my-0">
                        <div className="bg-white  w-full px-5 py-8 mx-auto my-auto rounded-md shadow-md xl:mr-20 sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-3/4  xl:bg-transparent ">
                            <h2 className=" text-center text-2xl font-medium mb-8 intro-x xl:text-right xl:text-3xl  text-black ">
                                ورود
                            </h2>
                            <form onSubmit={formik.handleSubmit}>
                                {error && (
                                    <span className="text-red-500 text-xs font-semibold  ">
                                        {error}
                                    </span>
                                )}
                                <div className="intro-x">
                                    {/* <Input label="ایمیل" name="email" formik={formik} type="email" /> */}

                                    <Input
                                        placeholder="نام کاربری"
                                        formik={formik}
                                        name="mobile"
                                    />
                                    <Input
                                        placeholder="رمز عبور"
                                        formik={formik}
                                        name="password"
                                        type="password"
                                    />
                                </div>
                                <div className="text-xs xl:text-sm  text-slate-600 mt-4 intro-x">
                                    <Link className="">
                                        رمز عبور خود را فراموش کردید؟
                                    </Link>
                                </div>
                                <div className="intro-x mt-5">
                                    <button
                                        type="submit"
                                        className="w-full xl:w-1/4 px-4 py-3 bg-primaryOne rounded-md text-white "
                                    >
                                        ورود
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
