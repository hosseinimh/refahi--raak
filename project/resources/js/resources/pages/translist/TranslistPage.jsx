import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCatPlaces } from "../../services/catPlace";
import { getAllRentPlace } from "../../services/place";

const TranslistPage = () => {
    const [rows, setRows] = useState([]);
    useEffect(() => {
        getCatPlaces();
    }, []);
    // console.log(rows);
    const getCatPlaces = async () => {
        await getAllRentPlace()
            .then((res) => setRows(res.data.placelistrent))
            .catch((error) => console.log(error));
    };
console.log(rows)
    return (
        <div className="flex flex-col px-10 font-IRANSansWeb">
            <h2 className="mt-10 text-lg font-medium intro-y">لیست واگذاری</h2>
            <div className="flex justify-between mt-5 ">
                <div className="intro-y">
                    <span className="ml-3 bg-primaryOne py-2 px-4 rounded-md text-white">
                        افزودن کاربر جدید
                    </span>
                    <Link to="/panel/places">
                        <button className="bg-white py-2 px-4 rounded-md shadow-sm text-xl cursor-pointer">
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
            {/* table user List */}
            <table className="table-auto w-full border-spacing-y-[15px] border-separate mt-10">
                <thead className="">
                    <tr>
                        <th>نام</th>
                        <th>نام خانوادگی</th>
                        <th>کد ملی</th>
                        <th>کد پرسنلی</th>
                        <th>موبایل</th>
                        {/* <th>حذف/ویرایش</th> */}
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
                                        {row.tenant_fname}
                                    </td>
                                    <td className="first:rounded-r-md last:rounded-l-md">
                                        {row.tenant_lname}
                                    </td>
                                  
                                    <td className="first:rounded-r-md last:rounded-l-md">
                                        {row.tenant_nat_code}
                                    </td>
                                    <td className="first:rounded-r-md last:rounded-l-md">
                                        {row.tenant_personal_code}
                                    </td>
                                    <td className="first:rounded-r-md last:rounded-l-md">
                                        {row.tenant_mobile}
                                    </td>
                                    {/* <td className="first:rounded-r-md last:rounded-l-md">
                                        <span className="text-red-400 mr-3">
                                            delete
                                        </span>
                                        <span className="text-green-400">
                                            edit
                                        </span>
                                    </td> */}
                                </tr>
                            );
                    })} 
                </tbody>
            </table>
        </div>
    );
};

export default TranslistPage;
