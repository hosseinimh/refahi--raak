import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../common/input";
import { deleteUser, getAllUsers } from "../../services/user";
import { MdModeEdit, MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { deletePlace } from "../../services/place";

const UserListPage = () => {
    const [error, setError] = useState(null);
    
    const [rows, setRows] = useState([]);

    useEffect(() => {
        getUsers();
    
    }, []);
    const getUsers = async () => {
        await getAllUsers()
            .then((res) => setRows(res.data.userlist))
            .catch((error) => console.log(error));
    };
    const deleteHandler = async (id) => {
        if (confirm("آیا مطمئن به حذف این کاربر می باشید؟")) {
     
            const { data } = await deleteUser(id);
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
            <h2 className="mt-10 text-lg font-medium intro-y">لیست کاربران</h2>
            <div className="flex justify-between mt-5 ">
                <div className="intro-y">
                    <span className="ml-3 bg-primaryOne py-2 px-4 rounded-md text-white">
                        افزودن کاربر جدید
                    </span>
                    <Link to="/panel/newuser">
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
            {error && <p>{error}</p>}
            {/* table user List */}
            <table className="table-auto w-full border-spacing-y-[15px] border-separate mt-10">
                <thead className="">
                    <tr>
                        <th>نام</th>
                        <th>نام خانوادگی</th>
                        <th>کد ملی</th>
                        <th>کد پرسنلی</th>
                        <th>موبایل</th>
                        <th>ویرایش/حذف</th>
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
                                    {row.fname}
                                </td>
                                <td className="first:rounded-r-md last:rounded-l-md">
                                    {row.lname}
                                </td>
                                <td className="first:rounded-r-md last:rounded-l-md">
                                    0740004931
                                </td>
                                <td className="first:rounded-r-md last:rounded-l-md">
                                    {row.email}
                                </td>
                                <td className="first:rounded-r-md last:rounded-l-md">
                                    {row.mobile}
                                </td>
                                <td className="first:rounded-r-md last:rounded-l-md">
                                    <Link to={`/panel/edituser/${row.id}`}>
                                        <button className="cursor-pointer  text-green-400">
                                            <MdModeEdit size={24} />
                                        </button>
                                    </Link>
                                    <button
                                        className="cursor-pointer  text-red-400 mr-3"
                                        onClick={() => deleteHandler(row.id)}
                                    >
                                        <MdDeleteOutline size={24} />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default UserListPage;
