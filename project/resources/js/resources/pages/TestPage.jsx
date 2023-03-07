import { useEffect, useState } from "react";
import { getAllTest } from "../services/testService";

const TestPage = () => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        getUsers();
        // getAllUsers()
    }, []);
    const getUsers = async () => {
        await getAllTest()
            .then((res) => setRows(res.data.userlist))
            .catch((error) => console.log(error));
    };

    return (
        <div className="bg-red-500 h-screen w-screen flex flex-col items-center justify-center text-2xl text-white">
            this is TestPage
            {rows.map((r) => {
                return (
                    <>
                        <p>{r.fname}</p>
                        
                    </>
                );
            })}
        </div>
    );
};

export default TestPage;
