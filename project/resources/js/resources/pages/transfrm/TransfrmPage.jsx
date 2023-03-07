import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../common/input";
import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import axios from "axios";
import { getOnePlace, rentAddPlace, rentSavePlace } from "../../services/place";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];



const initialValues = {
  id: "",
  owner_fname: "",
  owner_lname: "",
  owner_nat_code: "",
  owner_mobile: "",
  // descLessor:"",
  tenant_fname: "",
  tenant_lname: "",
  tenant_nat_code: "",
  tenant_mobile: "",
  // employeeCodeTenant: "",
  tenant_personal_code: "",
  tenant_orglevel: "",
  tenant_local_work: "",
  tenant_worktel: "",
  starttime: "",
  endtime: "",
  deposit_amount: "",
  rent_amount: "",
  uploadfile: null,
};

const validationSchema = Yup.object({
  id: Yup.string().required("کد ملک ضروری است").nullable(),
  owner_fname: Yup.string().required("نام موجر مورد نیاز است"),
  owner_lname: Yup.string().required("نام خانوادگی موجر مورد نیاز است"),
  owner_nat_code: Yup.string().required("کد ملی موجر ضروری است").nullable(),
  owner_mobile: Yup.string()
    .required("موبایل موجر ضروری است")
    .matches(/^[0-9]{11}$/, "موبایل نامعتبر است")
    .nullable(),
  tenant_fname: Yup.string(),
  tenant_lname: Yup.string(),
  tenant_nat_code: Yup.string().nullable(),
  tenant_mobile: Yup.string()
    .matches(/^[0-9]{11}$/, "موبایل نامعتبر است")
    .nullable(),
  // employeeCodeTenant: Yup.string()
  //   .required("کد کارمندی مستاجر ضروری است")
  //   .nullable(),
  tenant_personal_code: Yup.string()
    .required("کد پرسنلی مستاجر ضروری است")
    .nullable(),
  tenant_orglevel: Yup.string().required(
    "سمت سازمانی مستاجر ضروری است"
  ),
  tenant_local_work: Yup.string().required("محل کار مستاجر ضروری است"),
  tenant_worktel: Yup.string()
    .matches(/^[0-9]{11}$/, "موبایل نامعتبر است")
    .nullable(),
  deposit_amount: Yup.string().required("ملبغ رهن ضروری است").nullable(),
  rent_amount: Yup.string().required("مبلغ اجاره ضروری است").nullable(),
  starttime: Yup.string().required("تاریخ شروع اجاره ضروری است"),
  endtime: Yup.string().required("تاریخ اتمام اجاره ضروری است"),
  // uploadfile: Yup.mixed()
  //   .nullable()
  //   .required("فایل ضروری است")
  //   .test(
  //     "Fichier taille",
  //     "حداکثر سایز: 100کیلوبایت",
  //     (value) => !value || (value && value.size <= 100 * 1024)
  //   )
  //   .test(
  //     "format",
  //     "فرمت نامعتبر است",
  //     (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
  //   ),

});
const TransfrmPage = () => {
  const [formValues, setFormValues] = useState(null);
  const navigate = useNavigate();
    const params = useParams();
    const placeId = params.id;

  const getPlace = async () => {
    await rentAddPlace(placeId)
        .then((res) => formik.setFieldValue("id",res.data.place_id))
        .catch((error) => console.log(error));

  
};

useEffect(() => {
    if (isNaN(placeId)) {
        navigate(`/panel`);

        return;
    }
    // getOneUser()
    getPlace();
}, []);

  const onSubmit =async (values) => {
    if ( values.starttime instanceof DateObject  )
      values.starttime = values.starttime.toString();

      console.log( values.starttime)
      console.log( values.endtime)

    let formData = new FormData();    //formdata object

formData.append('place_id',values.id);   //append the values with key, value pair
formData.append('owner_fname', values.owner_fname);
formData.append('owner_lname', values.owner_lname);
formData.append('owner_nat_code', values.owner_nat_code);
formData.append('owner_mobile', values.owner_mobile);
formData.append('tenant_fname', values.tenant_fname);
formData.append('tenant_lname', values.tenant_lname);
formData.append('tenant_nat_code', values.tenant_nat_code);
formData.append('tenant_mobile', values.tenant_mobile);
// // formData.append('employeeCodeTenant', values.employeeCodeTenant);
formData.append('tenant_personal_code', values.tenant_personal_code);
formData.append('tenant_orglevel', values.tenant_orglevel);
formData.append('tenant_local_work', values.tenant_local_work);
formData.append('tenant_worktel', values.tenant_worktel);
formData.append('starttime', values.starttime);
formData.append('endtime', values.endtime);
formData.append('deposit_amount', values.deposit_amount);
formData.append('rent_amount', values.rent_amount);
// formData.append('uploadfile', values.uploadfile);

console.log(formData);
const result = await rentSavePlace(formData)

// toast.success(result.data._message);
// navigate("/panel/places")

// const config = {     
//     headers: { 'content-type': 'multipart/form-data' }
// }
// console.log("iman");
// for (const value of formData.values()) {
//   console.log(value);
// }
// axios.post("url", formData, config)
//     .then(response => {
//         console.log(response);
//     })
//     .catch(error => {
//         console.log(error);
//     });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    // enableReinitialize: true,
  });

  return (
    <div className="px-10 font-IRANSansWeb">
      <h2 className="mt-10 text-lg font-medium intro-y"> فرم واگذاری ملک</h2>
      <form onSubmit={formik.handleSubmit} className="flex flex-wrap max-w-[1100px] ">
        <Input
          name="id"
          type="number"
          placeholder="لطفا کد ملک را وارد نمائید"
          label="کد ملک"
          formik={formik}
        />
        {/* <h3 className="block">موجر</h3> */}
        <Input
          name="owner_fname"
          placeholder="لطفا نام موجر را وارد نمائید"
          label="نام موجر"
          formik={formik}
        />
        <Input
          name="owner_lname"
          placeholder="لطفا نام خانوادگی موجر را وارد نمائید"
          label="نام خانوادگی موجر"
          formik={formik}
        />
        <Input
          name="owner_nat_code"
          type="number"
          placeholder="لطفا کد ملی موجر را وارد نمائید"
          label="کد ملی موجر"
          formik={formik}
        />
        <Input
          name="owner_mobile"
          placeholder="لطفا موبایل موجر را وارد نمائید"
          label="موبایل موجر"
          formik={formik}
        />
        <Input
          name="tenant_fname"
          placeholder="لطفا نام مستاجر را وارد نمائید"
          label="نام مستاجر"
          formik={formik}
        />
        <Input
          name="tenant_lname"
          placeholder="لطفا نام خانوادگی مستاجر را وارد نمائید"
          label="نام خانوادگی مستاجر"
          formik={formik}
        />
        <Input
          name="tenant_nat_code"
          type="number"
          placeholder="لطفا کد ملی مستاجر را وارد نمائید"
          label="کد ملی مستاجر"
          formik={formik}
        />
        <Input
          name="tenant_mobile"
          placeholder="لطفا موبایل مستاجر را وارد نمائید"
          label="موبایل مستاجر"
          formik={formik}
        />
        {/* <Input
          name="employeeCodeTenant"
          type="number"
          placeholder="لطفا کد کارمندی مستاجر را وارد نمائید"
          label="کد کارمندی مستاجر"
          formik={formik}
        /> */}
        <Input
          name="tenant_personal_code"
          type="number"
          placeholder="لطفا کد پرسنلی مستاجر را وارد نمائید"
          label="کد پرسنلی مستاجر"
          formik={formik}
        />
        <Input
          label="سمت سازمانی مستاجر"
          formik={formik}
          name="tenant_orglevel"
          placeholder="لطفا سمت سازمانی مستاجر را وارد نمائید"
        />
        <Input
          label="محل کار مستاجر"
          formik={formik}
          name="tenant_local_work"
          placeholder="لطفا محل کار مستاجر را وارد نمائید"
        />
        <Input
          name="tenant_worktel"
          placeholder="لطفا تلفن محل کار مستاجر را وارد نمائید"
          label="تلفن محل کار مستاجر"
          formik={formik}
        />
        <Input
          name="deposit_amount"
          type="number"
          placeholder="لطفا مبلغ رهن را وارد نمائید"
          label="مبلغ رهن"
          formik={formik}
        />
        <Input
          name="rent_amount"
          type="number"
          placeholder="لطفا مبلغ اجاره را وارد نمائید"
          label="مبلغ اجاره"
          formik={formik}
        />
        <div className="flex flex-col mt-2 w-full md:ml-5 md:w-[250px]">
          <label className="intro-x text-slate-600 mb-1 text-sm">
            تاریخ شروع اجاره
          </label>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            value={formik.values.starttime}
            format="YYYY/MM/DD"
            name="starttime"
            onChange={(event) => {
              formik.setFieldValue("starttime", event.toString());
            }}
            inputClass="custom-input"
          />
        </div>
        <div className="flex flex-col mt-2 w-full md:ml-5 md:w-[250px]">
          <label>تاریخ پایان اجاره</label>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            value={formik.values.endtime}
            format="YYYY/MM/DD"
            name="endtime"
            onChange={(event) => {
              formik.setFieldValue("endtime", event.toString());
            }}
            inputClass="custom-input"
          />
        </div>
        {/* <div className="flex flex-col mt-2 w-full md:ml-5 md:w-[250px]">
          <label>فایل مورد نظر</label>
          <input
            type="file"
            name="uploadfile"
            onChange={(event) => {
              formik.setFieldValue("uploadfile", event.current_amountTarget.files[0]);
            }}
            onBlur={formik.handleBlur}
            id="uploadfile"
            className="w-full block text-sm shadow-sm border border-slate-200 rounded-md mb-1 px-4 py-3 placeholder:text-slate-400/90 placeholder:text-xs focus:ring-4 focus:ring-primaryOne focus:ring-opacity-20 focus:border-primaryOne focus:border-opacity-40 focus-visible:outline-0 intro-x "
          ></input>
          {formik.touched.uploadfile && formik.errors.uploadfile && (
            <div className="text-red-500 text-xs font-semibold col-start-2 col-end-3 ">
              {formik.errors.uploadfile}
            </div>
          )}
        </div> */}
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

export default TransfrmPage;
