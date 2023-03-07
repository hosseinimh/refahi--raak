import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../common/input";
import SelectInput from "../../common/SelectInput";
import CheckBoxInput from "../../common/CheckBoxInput";
import { useEffect, useState } from "react";
import { getAllPlace } from "../../services/place";
import { useNavigate, useParams } from "react-router-dom";

import { getEquipment } from "../../services/equipment";
import { addEquipment,getEquipmentPlace } from "../../services/equipmentPlace";
import { toast } from "react-toastify";

const initialValues = {
    kitchenFacilities: [],
    cateringFacilities: [],
    heatingSystem: [],
    coolingSystem: [],
    bedroomsFacilities: [],
    services: [],
    officeEquipment: [],
    yardEquipment: [],
};

const validationSchema = Yup.object({
    // kitchenFacilities: Yup.array()
    //     .required("امکانات آشپزخانه ضروری است")
    //     .min(1, "امکانات آشپزخانه ضروری است"),
    // cateringFacilities: Yup.array()
    //     .required("امکانات پذیرایی ضروری است")
    //     .min(1, "امکانات پذیرایی ضروری است"),
    // heatingSystem: Yup.array()
    //     .required("سیستم گرمایشی ضروری است")
    //     .min(1, "سیستم گرمایشی ضروری است"),
    // coolingSystem: Yup.array()
    //     .required("سیستم سرمایشی ضروری است")
    //     .min(1, "سیستم سرمایشی ضروری است"),
    // bedroomsFacilities: Yup.array()
    //     .required("امکانات اتاق خواب ضروری است")
    //     .min(1, "امکانات اتاق خواب ضروری است"),
    // services: Yup.array()
    //     .required("سرویس ها ضروری است")
    //     .min(1, "سرویس ها ضروری است"),
    // officeEquipment: Yup.array()
    //     .required("تجهیزات اداری ضروری است")
    //     .min(1, "تجهیزات اداری ضروری است"),
    // yardEquipment: Yup.array()
    //     .required("تجهیزات محوطه ضروری است")
    //     .min(1, "تجهیزات محوطه ضروری است"),
});

const AddPlaceEquipmentPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const placeId = params.id;
    const [formValues, setFormValues] = useState(null);

    const [kitchenFacilitiesOptions, setKitchenFacilitiesOptions] = useState(
        []
    );
    const [cateringFacilitiesOptions, setCateringFacilitiesOptions] = useState(
        []
    );
    const [heatingSystemOptions, setHeatingSystemOptions] = useState([]);
    const [coolingSystemOptions, setCoolingSystemOptions] = useState([]);
    const [bedroomsFacilitiesOptions, setBedroomsFacilitiesOptions] = useState(
        []
    );
    const [servicesOptions, setServicesOptions] = useState([]);
    const [officeEquipmentOptions, setOfficeEquipmentOptions] = useState([]);
    const [yardEquipmentOptions, setYardEquipmentOptions] = useState([]);

    // useEffect(() => {
    //     getProvinces();
    // }, []);

    const getEquipmentList = async () => {
        await getEquipmentPlace(placeId)
            .then((res) => {
                console.log(res.data);
                setKitchenFacilitiesOptions(res.data.kitchenFacilities);
                setCateringFacilitiesOptions(res.data.cateringFacilities);
                setHeatingSystemOptions(res.data.heatingSystem);
                setCoolingSystemOptions(res.data.coolingSystem);
                setBedroomsFacilitiesOptions(res.data.bedroomsFacilities);
                setServicesOptions(res.data.services);
                setOfficeEquipmentOptions(res.data.officeEquipment);
                setYardEquipmentOptions(res.data.yardEquipment);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (isNaN(placeId)) {
            navigate(`/panel`);

            return;
        }
        // getOneUser()
        getEquipmentList();
    }, []);

    const onSubmit = async (values) => {
        // const { placeId,kitchenFacilities,cateringFacilities,heatingSystem,coolingSystem,bedroomsFacilities,services,officeEquipment,yardEquipment } = values;
        const newArray = Object.values(values)
            .flat(1)
            .map((item) => item );

        console.log(Object.values(values))
        console.log(newArray)
        

        const result = await addEquipment({
            place_id: placeId,
            equipments: newArray,
        });
        console.log("result:", result);
        toast.success(result.data._message)
        // navigate(`/panel/places`);
    };
    const handleChange = (e, obj) => {
        console.log(e.target);
        if (e.target.checked) {
            formik.setFieldValue(e.target.name, [
                ...formik.values[e.target.name],
                obj,
            ]);
        } else {
            formik.setFieldValue(
                e.target.name,
                formik.values.kitchenFacilities.filter(
                    (x) => x?.name !== obj.name
                )
            );
        }
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,
    });
    // console.log(formik.values);
    return (
        <div className="px-10 font-IRANSansWeb">
            <h2 className="mt-10 text-lg font-medium intro-y">
                فرم ثبت امکانات ملک
            </h2>
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-wrap max-w-[1100px] "
            >
                <CheckBoxInput
                    formik={formik}
                    label="امکانات آشپزخانه"
                    name="kitchenFacilities"
                    checkBoxOptions={kitchenFacilitiesOptions}
                    onChange={handleChange}
                />
                <CheckBoxInput
                    formik={formik}
                    label="امکانات پذیرایی"
                    name="cateringFacilities"
                    checkBoxOptions={cateringFacilitiesOptions}
                    onChange={handleChange}
                />
                <CheckBoxInput
                    formik={formik}
                    label="سیستم گرمایشی"
                    name="heatingSystem"
                    checkBoxOptions={heatingSystemOptions}
                    onChange={handleChange}
                />
                <CheckBoxInput
                    formik={formik}
                    label="سیستم سرمایشی"
                    name="coolingSystem"
                    checkBoxOptions={coolingSystemOptions}
                    onChange={handleChange}
                />
                <CheckBoxInput
                    formik={formik}
                    label="امکانات اتاق خواب"
                    name="bedroomsFacilities"
                    checkBoxOptions={bedroomsFacilitiesOptions}
                    onChange={handleChange}
                />
                <CheckBoxInput
                    formik={formik}
                    label="سرویس ها"
                    name="services"
                    checkBoxOptions={servicesOptions}
                    onChange={handleChange}
                />
                <CheckBoxInput
                    formik={formik}
                    label="تجهیزات اداری"
                    name="officeEquipment"
                    checkBoxOptions={officeEquipmentOptions}
                    onChange={handleChange}
                />
                <CheckBoxInput
                    formik={formik}
                    label="تجهیزات محوطه"
                    name="yardEquipment"
                    checkBoxOptions={yardEquipmentOptions}
                    onChange={handleChange}
                />

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

export default AddPlaceEquipmentPage;
