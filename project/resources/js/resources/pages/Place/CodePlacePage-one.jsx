import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../common/input";
import SelectInput from "../../common/SelectInput";
import CheckBoxInput from "../../common/CheckBoxInput";
import { useEffect, useState } from "react";
import { getAllPlace } from "../../services/place";
import { useNavigate, useParams } from "react-router-dom";

import { getEquipment } from "../../services/equipment";
import {
    addEquipment,
    getOneEquipmentPlace,
    saveCodePlace,
} from "../../services/equipmentPlace";
import { toast } from "react-toastify";
import { useQuery } from "../../hooks/useQuery";

const numberOptions = [
    { title: "", label: "" },
    { title: "1", label: "1" },
    { title: "2", label: "2" },
    { title: "3", label: "3" },
    { title: "4", label: "4" },
    { title: "5", label: "5" },
    { title: "6", label: "6" },
    { title: "7", label: "7" },
];

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

const CodePlacePage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const placeId = params.id;

    // const initialValues = {
    //     codeEquipments: []
    // };

    const [codeEquipments, setCodeEquipments] = useState([]);
    const [count, setCount] = useState([]);
    const [saveInputs, setSaveInputs] = useState([]);

    useEffect(() => {
        iman();
    }, [codeEquipments]);

    const changeHandler = (e) => {
        console.log(e);
    };
    const iman = () => {
        codeEquipments?.map((equip, index) => {
            // const input = `
            // <label class=" text-slate-600 mb-1 text-sm"></label>
            // <input equipid="${equip.id}" class="w-full block text-sm shadow-sm border border-slate-200 rounded-md mb-1 px-4 py-3 placeholder:text-slate-400/90 placeholder:text-xs focus:ring-4 focus:ring-primaryOne focus:ring-opacity-20 focus:border-primaryOne focus:border-opacity-40 focus-visible:outline-0 code" />`;
            let inputs = "";
            for (let i = 0; i < equip.count; i++) {
                inputs += `
                <label class=" text-slate-600 mb-1 text-sm"></label>
                <input equipid="${equip.id}" id="${equip.id+i}" class="w-full block text-sm shadow-sm border border-slate-200 rounded-md mb-1 px-4 py-3 placeholder:text-slate-400/90 placeholder:text-xs focus:ring-4 focus:ring-primaryOne focus:ring-opacity-20 focus:border-primaryOne focus:border-opacity-40 focus-visible:outline-0 code" />`;
            }
            document.getElementById(`inputs-${equip.id}`).innerHTML = `
            <div class=" flex flex-col mt-2 w-full md:ml-5 md:w-[250px]">
        
             ${inputs}
                </div>`;
                
        });
    };

    const [equiopments, setEquiopments] = useState([]);

    const getEquipmentList = async () => {
        await getOneEquipmentPlace(placeId)
            .then((res) => {
                setEquiopments(res.data._msplace_equip_list);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    console.log(equiopments)

    useEffect(() => {
        if (isNaN(placeId)) {
            navigate(`/panel`);

            return;
        }
        // getOneUser()
        getEquipmentList();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const x = document.querySelectorAll(".code");

        x.forEach((input) => {
            codeEquipments.forEach((equip) => {
                if (equip.id == input.getAttribute("equipid")) {
                   equip.codes.push(input.value);
                   
                }
            });
        });
        console.log(codeEquipments)
        const newArray=codeEquipments.flat(1).map((item) => item );
        console.log(newArray)
        // console.log(newArray.eqm_id);
       try {
        const result = await saveCodePlace({equipments:newArray}).then((res) => {console.log(res);}).catch((err) => {console.log(err);});
        // console.log("result:", result);
       } catch (error) {
        console.log(error);
       }

        // const newArray = Object.values(values)
        //     .flat(1)
        //     .map((item) => item.id);

        // const result = await addEquipment({
        //     place_id: placeId,
        //     equipments: newArray,
        // });
        // console.log("result:", result);
        // toast.success(result.data._message);
        // navigate(`/panel/places`);
    };
    // const handleChange = (e, obj) => {
    //     console.log(e.target);
    //     if (e.target.checked) {
    //         formik.setFieldValue(e.target.name, [
    //             ...formik.values[e.target.name],
    //             obj,
    //         ]);
    //     } else {
    //         formik.setFieldValue(
    //             e.target.name,
    //             formik.values.kitchenFacilities.filter(
    //                 (x) => x?.name !== obj.name
    //             )
    //         );
    //     }
    // };

    const handleCount = (id, cnt, eqm_id, place_id) => {
        // codeEquipment [{id,codes:[],count}]
        let others = codeEquipments.filter((x) => x.id !== id);
        let obj = codeEquipments.filter((x) => x.id === id);
        setCodeEquipments([
            ...others,
            {
                id,
                codes: obj?.codes ?? [],
                count: parseInt(cnt),
                eqm_id,
                place_id,
            },
        ]);
    };

    // const formik = useFormik({
    //     initialValues,
    //     onSubmit,
    //     validationSchema,
    //     validateOnMount: true,
    // });
    // console.log(formik.values);
    return (
        <div className="px-10 font-IRANSansWeb">
            <h2 className="mt-10 text-lg font-medium intro-y">
                تعداد {equiopments.length} امکانات یافت شد
            </h2>
            <form
                onSubmit={handleSubmit}
                className="flex flex-wrap max-w-[1100px] "
            >
                {equiopments.map((item) => {
                    return (
                        <>
                            <div
                                className="flex flex-col mb-3 w-full"
                                key={item.id}
                            >
                                <h2 id={item.id} className="block mb-2">
                                    نام :{item.title}
                                </h2>
                            </div>
                            <div className="flex flex-col">
                                <select
                                    id={item.id}
                                    name="codeEquipments"
                                    // value={formik.values.codeEquipments}
                                    // onBlur={formik.handleBlur}
                                    onChange={(e) =>
                                        handleCount(
                                            item.id,
                                            e.target.value,
                                            item.eqm_id,
                                            item.place_id
                                        )
                                    }
                                    // onChange={(e) => {
                                    //     formik.setFieldValue("codeEquipments",  handleCount(item.id, e.target.value));
                                    //   }}
                                    className="w-full max-w-[150px] block text-sm shadow-sm border border-slate-200 rounded-md mb-1 px-4 py-3 placeholder:text-slate-400/90 placeholder:text-xs focus:ring-4 focus:ring-primaryOne focus:ring-opacity-20 focus:border-primaryOne focus:border-opacity-40 focus-visible:outline-0 intro-x "
                                >
                                    <option>انتخاب کنید</option>

                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                <div
                                    id={`inputs-${item.id}`}
                                    className="flex flex-wrap"
                                ></div>
                            </div>
                        </>
                    );
                })}

                <div className="flex flex-col justify-center mt-2 w-full md:ml-5 md:w-[250px]">
                    <button
                        type="submit"
                        // disabled={!formik.isValid}
                        className=" outline-none w-[200px] border-none rounded text-white bg-primaryOne mt-4 px-4 py-3 cursor-pointer disabled:border-[#999999] disabled:bg-[#cccccc] disabled:text-[#666666] disabled:cursor-not-allowed"
                    >
                        تائید
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CodePlacePage;
