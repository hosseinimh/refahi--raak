import { useEffect, useState } from "react";
import {
    MdDeleteOutline,
    MdModeEdit,
    MdOutlineLibraryAdd,
} from "react-icons/md";
import { Link } from "react-router-dom";
import Tooltip from "../../common/Tooltip";
import { getAllPlaces, deletePlace } from "../../services/place";
import { toast } from "react-toastify";

const PlaceListPage = () => {
    const [error, setError] = useState(null);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        getPlaces();
    }, []);
    console.log(rows);

    const getPlaces = async () => {
        await getAllPlaces()
            .then((res) => setRows(res.data.placelist))
            .catch((error) => console.log(error));
    };

    const deleteHandler = async (id) => {
        if (confirm("آیا مطمئن به حذف این مکان می باشید؟")) {
            // console.log("delete:", id);
            const { data } = await deletePlace(id);
            if (data._result !== "1") {
                setError(data._error);
                return;
            }
            toast.success(data._message);
            window.location.reload();
        }
    };

    return (
        <div className="flex flex-col px-10 font-IRANSansWeb">
            <h2 className="mt-10 text-lg font-medium intro-y">لیست اماکن</h2>
            <div className="flex justify-between mt-5 ">
                <div className="intro-y">
                    <span className="hidden md:inline ml-3 bg-primaryOne py-2 px-4 rounded-md text-white">
                        ثبت ملک جدید
                    </span>
                    <Link to="/panel/addplace">
                        <button className="md:bg-white md:text-black text-white bg-primaryOne py-2 px-4 rounded-md shadow-sm text-xl cursor-pointer">
                            +
                        </button>
                    </Link>
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
                        <th>کد ملک</th>
                        <th>نام</th>
                        <th>اعیان</th>
                        <th>آدرس ملک</th>
                        <th>حذف/ویرایش/امکانات</th>
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
                                    {row.id}
                                </td>
                                <td className="first:rounded-r-md last:rounded-l-md">
                                    {row.title}
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
                                        <Link to={`/panel/editplace/${row.id}`}>
                                            <button className="cursor-pointer  text-green-400">
                                                <MdModeEdit size={24} />
                                            </button>
                                        </Link>
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
                                     <Tooltip message={"افزودن امکانات"}>
                                        <Link
                                            to={`/panel/addPlaceEquipment/${row.id}`}
                                        >
                                            <button className="cursor-pointer  text-primaryOne  mr-3">
                                                <MdOutlineLibraryAdd
                                                    size={24}
                                                />
                                            </button>
                                        </Link>
                                    </Tooltip> 
                                    {/* <Tooltip message={"کد اموال"}>
                                        <Link
                                            to={`/panel/codePlace/${row.id}`}
                                        >
                                            <button className="cursor-pointer  text-primaryOne  mr-3">
                                                <MdOutlineLibraryAdd
                                                    size={24}
                                                />
                                            </button>
                                        </Link>
                                    </Tooltip>  */}
                                    <Tooltip message={"واگذاری ملک"}>
                                        <Link
                                            to={`/panel/placeRent/${row.id}`}
                                        >
                                            <button className="cursor-pointer  text-primaryOne  mr-3">
                                                <MdOutlineLibraryAdd
                                                    size={24}
                                                />
                                            </button>
                                        </Link>
                                    </Tooltip> 
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default PlaceListPage;
