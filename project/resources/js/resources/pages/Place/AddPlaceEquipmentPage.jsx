import { useEffect, useState } from "react";
import * as Yup from "yup";
import {
    MdDeleteOutline,
    MdModeEdit,
    MdOutlineLibraryAdd,
} from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import Tooltip from "../../common/Tooltip";
import { getAllPlaces, deletePlace, getAllTowns } from "../../services/place";
import { toast } from "react-toastify";
import SelectInput from "../../common/SelectInput";
import Input from "../../common/input";
import { useFormik } from "formik";
import { getEquipment } from "../../services/equipment";
import {
    addEquipment,
    deleteEquipmentPlace,
    getOneEquipmentEdit,
    getOneEquipmentPlace,
    saveCodePlace,
    updateEquipment,
} from "../../services/equipmentPlace";

const initialValues = {
    eqm_id: "",
    eqm_parent: "",
    serial: "",
    facilities: [],
};

const validationSchema = Yup.object({
    eqm_id: Yup.string().required("نوع امکانات ضروری است"),
    eqm_parent: Yup.string().required("امکانات ضروری است"),
    serial: Yup.string().nullable(),
});

const PlaceListPage = () => {
    const [error, setError] = useState(null);
    const [rows, setRows] = useState([]);
    const [formValues, setFormValues] = useState(null);
    const [facilitiesOptions, setFacilitiesOptions] = useState([]);
    const [facilitiesTypes, setFacilitiesTypes] = useState([]);
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
    const navigate = useNavigate();
    const params = useParams();
    const placeId = params.id;

    const getAllFacilities = (facilitie) => {
        // Simulate async call
        return new Promise((resolve, reject) => {
            switch (facilitie) {
                case "1":
                    resolve(kitchenFacilitiesOptions);
                    break;
                case "2":
                    resolve(cateringFacilitiesOptions);
                    break;
                case "3":
                    resolve(bedroomsFacilitiesOptions);
                    break;
                case "4":
                    resolve(servicesOptions);
                    break;
                case "5":
                    resolve(officeEquipmentOptions);
                    break;
                case "6":
                    resolve(yardEquipmentOptions);
                    break;
                case "7":
                    resolve(heatingSystemOptions);
                    break;
                case "8":
                    resolve(coolingSystemOptions);
                    break;
                default:
                    resolve([]);
            }
        });
    };

    useEffect(() => {
        getFacilities();
        getOneEquPlace();
    }, []);

    const getFacilities = async () => {
        await getEquipment()
            .then((res) => {
                console.log(res.data);
                setFacilitiesTypes(res.data.facilities);
                setFacilitiesOptions(res.data.facilitiesTypes);
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
    const getOneEquPlace = async () => {
        await getOneEquipmentPlace(placeId)
            .then((res) => {
                console.log(res.data._msplace_equip_list);
                setRows(res.data._msplace_equip_list);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteHandler = async (id) => {
        if (confirm("آیا مطمئن به حذف این مکان می باشید؟")) {
            // console.log("delete:", id);
            const { data } = await deleteEquipmentPlace(id);
            if (data._result !== "1") {
                setError(data._error);
                return;
            }
            toast.success(data._message);
            window.location.reload();
        }
    };

    const editHandler = async (id) => {
        setModal(true);
        // getFacilities();
        const { data } = await getOneEquipmentEdit(id);
        console.log("imkasdarnagh : ", data.Equipment_info);
        setFormValues(data.Equipment_info);
    };
    const updateHandler = (e, Values) => {
        e.preventDefault();
        console.log("updateHandler", Values);
        updateEquipment(formValues.id, Values)
            .then(({ data }) => {
							window.location.reload();
							toast.success(data._message);
            })
            .catch((err) => console.log(err));
    };

    const [modal, setModal] = useState(false);
    const onSubmit = async (values) => {
        console.log("update:", placeId, values);
        const { eqm_id, serial, eqm_parent } = values;
        try {
            const result = await addEquipment({
                placeId,
                serial,
                eqm_id,
                eqm_parent,
            })
                .then(({data}) => {
									console.log(data);
									// window.location.reload();
									// toast.success(data._message);
                })
                .catch((err) => {
                    console.log(err);
                });
            console.log("result:", result);
        } catch (error) {
            console.log(error);
        }
        formik.values.serial = "";
        formik.values.eqm_id = "";
        formik.values.eqm_parent = "";
        formik.touched.serial = false;
        formik.touched.eqm_id = false;
        formik.touched.eqm_parent = false;
        setModal(false);
        // window.location.reload();
    };
    const formik = useFormik({
        initialValues: formValues || initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,
        enableReinitialize: true,
    });

    console.log(formik.values);

    return (
        <>
            {modal ? (
                <div className="w-3/4 h-3/4 px-10 bg-gray-100 font-IRANSansWeb fixed flex justify-center items-center z-50">
                    <div className="w-[500px] h-5[500px] rounded-xl bg-white shadow-sm flex flex-col p-6 ">
                        <form
                            onSubmit={formik.handleSubmit}
                            className="flex flex-col "
                        >
                            <div>
                                <div className="flex flex-col mt-2 w-full md:ml-5 md:w-[250px]">
                                    <label className="intro-x text-slate-600 mb-1 text-sm">
                                        امکانات
                                    </label>
                                    <select
                                        name="eqm_parent"
                                        // value={formik.values.eqm_parent}
                                        onChange={async (event) => {
                                            const _facilities =
                                                await getAllFacilities(
                                                    event.target.value
                                                );
                                            formik.setFieldValue(
                                                "eqm_parent",
                                                event.target.value
                                            );
                                            formik.setFieldValue("eqm_id", "");
                                            formik.setFieldValue(
                                                "facilities",
                                                _facilities
                                            );
                                        }}
                                        onBlur={formik.handleBlur}
                                        id="eqm_parent"
                                        className="w-full block text-sm shadow-sm border border-slate-200 rounded-md mb-1 px-4 py-3 placeholder:text-slate-400/90 placeholder:text-xs focus:ring-4 focus:ring-primaryOne focus:ring-opacity-20 focus:border-primaryOne focus:border-opacity-40 focus-visible:outline-0 intro-x "
                                    >
                                        <option value="None">
                                            انتخاب امکانات
                                        </option>
                                        {facilitiesTypes.map((item) => (
                                            <option
                                                value={item.id}
                                                key={item.id}
                                                id={item.id}
                                            >
                                                {item.title}
                                            </option>
                                        ))}
                                    </select>

                                    {formik.touched.eqm_parent &&
                                        formik.errors.eqm_parent && (
                                            <div className="text-red-500 text-xs font-semibold col-start-2 col-end-3 ">
                                                {formik.errors.eqm_parent}
                                            </div>
                                        )}
                                </div>
                                <div className="flex flex-col mt-2 w-full md:ml-5 md:w-[250px]">
                                    <label className="intro-x text-slate-600 mb-1 text-sm">
                                        نوع امکانات
                                    </label>
                                    <select
                                        name="eqm_id"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        // value={formik.values.eqm_id}
                                        {...formik.getFieldProps("eqm_id")}
                                        id="eqm_id"
                                        className="w-full block text-sm shadow-sm border border-slate-200 rounded-md mb-1 px-4 py-3 placeholder:text-slate-400/90 placeholder:text-xs focus:ring-4 focus:ring-primaryOne focus:ring-opacity-20 focus:border-primaryOne focus:border-opacity-40 focus-visible:outline-0 intro-x "
                                    >
                                        <option value="None">
                                            انتخاب نوع امکانات
                                        </option>
                                        {formik.values.facilities &&
                                            formik.values.facilities.map(
                                                (item) => (
                                                    <option
                                                        key={item.id}
                                                        id={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.title}
                                                    </option>
                                                )
                                            )}
                                    </select>

                                    {formik.touched.eqm_id &&
                                        formik.errors.eqm_id && (
                                            <div className="text-red-500 text-xs font-semibold col-start-2 col-end-3 ">
                                                {formik.errors.eqm_id}
                                            </div>
                                        )}
                                </div>
                            </div>
                            <div>
                                <Input
                                    name="serial"
                                    type="number"
                                    placeholder="لطفا شماره اموال را وارد نمائید"
                                    label="شماره اموال"
                                    formik={formik}
                                />
                                <div className="flex justify-between w-full">
                                    {formValues ? (
                                        <button
                                            onClick={(e) =>
                                                updateHandler(e, formik.values)
                                            }
                                            className=" outline-none w-[200px] border-none rounded text-white bg-primaryOne mt-4 px-4 py-3 cursor-pointer disabled:border-[#999999] disabled:bg-[#cccccc] disabled:text-[#666666] disabled:cursor-not-allowed"
                                        >
                                            به روز رسانی
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            disabled={!formik.isValid}
                                            className=" outline-none w-[200px] border-none rounded text-white bg-primaryOne mt-4 px-4 py-3 cursor-pointer disabled:border-[#999999] disabled:bg-[#cccccc] disabled:text-[#666666] disabled:cursor-not-allowed"
                                        >
                                            تائید
                                        </button>
                                    )}

                                    <button
                                        onClick={() => {
                                            setModal(false);
                                            formik.values.serial = "";
                                            formik.values.eqm_id = "";
                                            formik.values.eqm_parent = "";
                                            formik.touched.serial = false;
                                            formik.touched.eqm_id = false;
                                            formik.touched.eqm_parent = false;
                                            setFormValues(null);
                                        }}
                                        className="outline-none w-[200px] border-none rounded text-white bg-red-500 mt-4 px-4 py-3 cursor-pointer"
                                    >
                                        انصراف
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                ""
            )}
            <div className="flex flex-col px-10 font-IRANSansWeb">
                <h2 className="mt-10 text-lg font-medium intro-y">
                    لیست امکانات
                </h2>
                <div className="flex justify-between mt-5 ">
                    <div className="intro-y">
                        <span className="hidden md:inline ml-3 bg-primaryOne py-2 px-4 rounded-md text-white">
                            ثبت امکان جدید
                        </span>

                        <button
                            className="md:bg-white md:text-black text-white bg-primaryOne py-2 px-4 rounded-md shadow-sm text-xl cursor-pointer"
                            onClick={() => {
                                setModal(true);
                            }}
                        >
                            +
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="جستجو"
                        className="w-[230px] block text-sm shadow-sm border border-slate-200 rounded-md mb-1 px-4 py-3 placeholder:text-slate-400/90 placeholder: focus:ring-4 focus:ring-primaryOne focus:ring-opacity-20 focus:border-primaryOne focus:border-opacity-40 focus-visible:outline-0 intro-y"
                    />
                </div>
                {error && <p>{error}</p>}
                {/* table place List */}
                <table className="  w-full overflow-x-auto border-spacing-y-[15px] border-separate mt-10">
                    <thead className="">
                        <tr>
                            <th>نام</th>
                            <th>شماره اموال</th>
                            <th>تاریخ واگذاری</th>
                            <th>تاریخ تحویل</th>
                            <th>حذف/ویرایش</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => {
                            return (
                                <tr
                                    key={row.id}
                                    className="text-center bg-white h-[60px] rounded-md shadow-[20px_3px_20px_#0000000b] text-slate-500 font-IRANSansWeb_FaNum intro-x  "
                                >
                                    <td className="first:rounded-r-md last:rounded-l-md">
                                        {row.title}
                                    </td>
                                    <td className="first:rounded-r-md last:rounded-l-md">
                                        {row.serial}
                                    </td>
                                    <td className="first:rounded-r-md last:rounded-l-md">
                                        {row.ayan}
                                    </td>
                                    <td className="first:rounded-r-md last:rounded-l-md">
                                        {row.address}
                                    </td>
                                    {/* <td className="first:rounded-r-md last:rounded-l-md">
                                    {row.phoneNumber}
                                </td> */}
                                    <td className="first:rounded-r-md last:rounded-l-md">
                                        <Tooltip message={"ویرایش"}>
                                            {/* <Link
                                                to={`/panel/editplace/${row.id}`}
                                            > */}
                                            <button
                                                className="cursor-pointer  text-green-400"
                                                onClick={() => {
                                                    editHandler(row.id);
                                                }}
                                            >
                                                <MdModeEdit size={24} />
                                            </button>
                                            {/* </Link> */}
                                        </Tooltip>
                                        <Tooltip message={"حذف"}>
                                            <button
                                                className="cursor-pointer  text-red-400 mr-3"
                                                onClick={() =>
                                                    deleteHandler(row.id)
                                                }
                                            >
                                                <MdDeleteOutline size={24} />
                                            </button>
                                        </Tooltip>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default PlaceListPage;
