import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../common/input";
import SelectInput from "../../common/SelectInput";
import CheckBoxInput from "../../common/CheckBoxInput";
import { useEffect, useState } from "react";
import { addPlace, getAllTowns } from "../../services/place";
import axios from "axios";
import BooleanCheckBox from "../../common/BooleanCheckBox";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialValues = {
    ptype: "",
    title: "",
    bana: false,
    arse: "",
    ayan: "",
    address: "",
    postalcode: "",
    townid: "",
    tel: "",
    area_land: "",
    num_room: "",
    org_num: "",
    sub_num: "",
    uniq_id: "",
    nation_geo: "",
    waterID: "",
    power_id: "",
    gas_id: "",
    // numOfFloors: "",
};

const validationSchema = Yup.object({
    ptype: Yup.string().required("نوع ملک ضروری است"),
    title: Yup.string().required("نام ملک مورد نیاز است"),
    //    bana: Yup.boolean().required("بنا ضروری است"),
    arse: Yup.string().required(" متراژ زمین ضروری است").nullable(),
    ayan: Yup.string().required("اعیان ضروری است").nullable(),
    address: Yup.string().nullable(),
    postalcode: Yup.string().nullable(),
    townid: Yup.string().required("شهر ضروری است"),
    tel: Yup.string().required("شناسه اشتراک تلفن ضروری است").nullable(),
    area_land: Yup.string().required("متراژزمین ضروری است").nullable(),
    num_room: Yup.string().required("تعداد اتاق ضروری است").nullable(),
    org_num: Yup.string().required("شماره پلاک اصلی ضروری است").nullable(),
    sub_num: Yup.string().required("شماره پلاک فرعی ضروری است").nullable(),
    uniq_id: Yup.string(),
    nation_geo: Yup.string(),
    waterID: Yup.string().required("شناسه اشتراک آب ضروری است").nullable(),
    power_id: Yup.string().required("شناسه اشتراک برق ضروری است").nullable(),
    gas_id: Yup.string().required("شناسه اشتراک گاز ضروری است").nullable(),
    // numOfFloors: Yup.string().required("تعداد اتاق ضروری است").nullable(),
});

const AddPlacePage = () => {
    const [propertyTypeOptions, setPropertyTypeOptions] = useState([]);
    const [townsOptions, setTownsOptions] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getProvinces();
    }, []);

    const getProvinces = async () => {
        await getAllTowns()
            .then((res) => {
                setTownsOptions(res.data.town_list);
                setPropertyTypeOptions(res.data.placeType_list);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onSubmit = async (values) => {
        
        const {
            ptype,
            title,
            bana,
            arse,
            ayan,
            address,
            postalcode,
            townid,
            tel,
            area_land,
            num_room,
            org_num,
            sub_num,
            uniq_id,
            nation_geo,
            waterID,
            power_id,
            gas_id,
        } = values;
        // console.log(arse);
        const result = await addPlace({
            ptype,
            title,
            bana,
            arse,
            ayan,
            address,
            postalcode,
            townid,
            tel,
             area_land,
            num_room,
            org_num,
            sub_num,
            uniq_id,
            nation_geo,
            waterID,
            power_id,
            gas_id,
            // numOfFloors,
        });
        console.log(result);
        toast.success(result.data._message);
        // navigate(`/panel/places`);
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,
    });

    return (
        <div className="px-10 font-IRANSansWeb">
            <h2 className="mt-10 text-lg font-medium intro-y">
                فرم ثبت اطلاعات ملک
            </h2>
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-wrap max-w-[1100px] "
            >
                <SelectInput
                    formik={formik}
                    label="نوع ملک"
                    name="ptype"
                    selectOptions={propertyTypeOptions}
                />
                 <SelectInput
                    formik={formik}
                    label="شهر"
                    name="townid"
                    selectOptions={townsOptions}
                /> 

                {/* iman */}
                {/* <div className="flex flex-col mt-2 w-full md:ml-5 md:w-[250px]">
                    <label className="intro-x text-slate-600 mb-1 text-sm">
                        شهر
                    </label>
                    <select
                        name="towns"
                        onChange={formik.handleChange}
                        // onChange={async (event) => {
                        //     const _provinces = await getProvinces(
                        //         event.target.value
                        //     );
                        //     formik.setFieldValue(
                        //         "province",
                        //         event.target.value
                        //     );
                        //     // formik.setFieldValue("city", "");
                        //     // formik.setFieldValue("provinces", _provinces);
                        // }}
                        onBlur={formik.handleBlur}
                        id="towns"
                        className="w-full block text-sm shadow-sm border border-slate-200 rounded-md mb-1 px-4 py-3 placeholder:text-slate-400/90 placeholder:text-xs focus:ring-4 focus:ring-primaryOne focus:ring-opacity-20 focus:border-primaryOne focus:border-opacity-40 focus-visible:outline-0 intro-x "
                    >
                        <option value="None">انتخاب شهر</option>
                        {townsOptions.map((item) => (
                            <option value={item.title} key={item.id}>
                                {item.title}
                            </option>
                        ))}
                    </select>

                    {formik.touched.towns && formik.errors.towns && (
                        <div className="text-red-500 text-xs font-semibold col-start-2 col-end-3 ">
                            {formik.errors.province}
                        </div>
                    )}
                </div> */}
                <Input
                    name="title"
                    placeholder="لطفا نام ملک را وارد نمائید"
                    label="نام ملک"
                    formik={formik}
                />
                  <Input
                    name="arse"
                    type="number"
                    placeholder="لطفا عرصه را وارد نمائید"
                    label="عرصه"
                    formik={formik}
                />
                <Input
                    name="ayan"
                    type="number"
                    placeholder="لطفا اعیان را وارد نمائید"
                    label="اعیان"
                    formik={formik}
                />
                <Input
                    name="postalcode"
                    type="number"
                    placeholder="لطفا کد پستی ملک را وارد نمائید"
                    label="کد پستی ملک"
                    formik={formik}
                />
                 <Input
                    name="tel"
                    type="number"
                    placeholder="لطفا شناسه اشتراک تلفن را وارد نمائید"
                    label="شناسه اشتراک تلفن"
                    formik={formik}
                />
               <Input
                    name="area_land"
                    type="number"
                    placeholder="لطفا متراژ زمین را وارد نمائید"
                    label="متراژ زمین"
                    formik={formik}
                />
              
                 <Input
                    name="num_room"
                    type="number"
                    placeholder="لطفا تعداد اتاق را وارد نمائید"
                    label="تعداد اتاق"
                    formik={formik}
                /> 
              {/* <Input
                    name="numOfFloors"
                    type="number"
                    placeholder="لطفا تعداد طبقه را وارد نمائید"
                    label="تعداد طبقه"
                    formik={formik} 
                />  */}
                <Input
                    name="org_num"
                    type="number"
                    placeholder="لطفا شماره پلاک اصلی شهرداری را وارد نمائید"
                    label="شماره پلاک اصلی شهرداری"
                    formik={formik}
                /> 

                 <Input
                    name="sub_num"
                    type="number"
                    placeholder="لطفا شماره پلاک فرعی شهرداری را وارد نمائید"
                    label="شماره پلاک فرعی شهرداری"
                    formik={formik}
                /> 
                <Input
                    name="uniq_id"
                    type="number"
                    placeholder="لطفا شناسه یکتا شهرداری را وارد نمائید"
                    label="شناسه یکتا شهرداری"
                    formik={formik}
                /> 
                 <Input
                    name="nation_geo"
                    type="number"
                    placeholder="لطفا شناسه ملی جغرافیایی را وارد نمائید"
                    label="شناسه ملی جغرافیایی"
                    formik={formik}
                />   
                <Input
                    name="waterID"
                    type="number"
                    placeholder="لطفا شناسه اشتراک آب را وارد نمائید"
                    label="شناسه اشتراک آب"
                    formik={formik}
                />
                <Input
                    name="power_id"
                    type="number"
                    placeholder="لطفا شناسه اشتراک برق را وارد نمائید"
                    label="شناسه اشتراک برق"
                    formik={formik}
                />
                <Input
                    name="gas_id"
                    type="number"
                    placeholder="لطفا شناسه اشتراک گاز را وارد نمائید"
                    label="شناسه اشتراک گاز"
                    formik={formik}
                />
               
                <BooleanCheckBox name="bana" formik={formik} label="ویلا" />
                <div className="flex flex-col justify-center mt-2 w-full md:ml-5 md:w-full">
                    <label className="intro-x text-slate-600 mb-1 text-sm">
                        آدرس
                    </label>
                    <textarea
                        name="address"
                        className="w-full block text-sm shadow-sm border border-slate-200 rounded-md mb-1 px-4 py-3 placeholder:text-slate-400/90 placeholder:text-xs focus:ring-4 focus:ring-primaryOne focus:ring-opacity-20 focus:border-primaryOne focus:border-opacity-40 focus-visible:outline-0 intro-x"
                        placeholder="لطفا آدرس خود را وارد نمایید"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    ></textarea>
                </div>

                <div className="flex flex-col justify-center mt-2 w-full md:ml-5 md:w-[250px]">
                    <button
                        type="submit"
                        disabled={!formik.isValid}
                        className=" outline-none w-[200px] border-none rounded text-white bg-primaryOne mt-4 px-4 py-3 cursor-pointer disabled:border-[#999999] disabled:bg-[#cccccc] disabled:text-[#666666] disabled:cursor-not-allowed"
                    >
                        تائید
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPlacePage;
