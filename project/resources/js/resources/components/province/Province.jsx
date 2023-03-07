import { useState } from "react";
const DATA = [
    {
        province: "خراسان رضوی",
        cities: [
            "بردسکن",
            "تایباد",
            "تربت جام",
            "تربت حیدریه",
            "چناران",
            "خلیل‌آباد",
            "خواف",
            "درگز",
            "رشتخوار",
            "سبزوار",
            "سرخس",
            "فریمان",
            "قوچان",
            "کاشمر",
            "کلات",
            "گناباد",
            "مشهد",
            "مه ولات",
            "نیشابور",
        ],
    },
    {
        province: "خراسان شمالی",
        cities: [
            "اسفراین",
            "بجنورد",
            "جاجرم",
            "شیروان",
            "فاروج",
            "مانه و سملقان",
        ],
    },
];

const Province = () => {
    const [province, setProvince] = useState();
    const [city, setCity] = useState([]);

    const selectProvince = (e) => {
        const selectedProvince = DATA.find(
            (entry) => entry.province === e.target.value
        );
        // setCity(undefined);
        setProvince(selectedProvince);
    };

    const selectCity = (e) => {
        setCity(e.target.value);
    };
    return (
        <>
            <select onChange={selectProvince}>
                {DATA.map((entry, index) => {
                    return (
                        <option key={index} value={entry.province}>
                            {entry.province}
                        </option>
                    );
                })}
            </select>

            <select onChange={selectCity}>
                {!!province &&
                    province.cities.map((city, index) => {
                        return (
                            <option value={city} key={index}>
                                {city}
                            </option>
                        );
                    })}
            </select>
        </>
    );
};

export default Province;



{/* <div className="flex flex-col mt-2 w-full md:ml-5 md:w-[250px]">
<label className="intro-x text-slate-600 mb-1 text-sm">
    استان
</label>
<select
    name="province"
    onChange={async (event) => {
        const _provinces = await getProvinces(
            event.target.value
        );
        console.log(_provinces);
        formik.setFieldValue(
            "province",
            event.target.value
        );
        formik.setFieldValue("city", "");
        formik.setFieldValue("provinces", _provinces);
    }}
    onBlur={formik.handleBlur}
    id="province"
    className="w-full block text-sm shadow-sm border border-slate-200 rounded-md mb-1 px-4 py-3 placeholder:text-slate-400/90 placeholder:text-xs focus:ring-4 focus:ring-primaryOne focus:ring-opacity-20 focus:border-primaryOne focus:border-opacity-40 focus-visible:outline-0 intro-x "
>
    <option value="None">انتخاب استان</option>
    {provinceOptions.map((item) => (
        <option value={item.title} key={item.id}>
            {item.title}
        </option>
    ))}
    {/* <option value="خراسان رضوی">خراسان رضوی</option>
    <option value="خراسان شمالی">خراسان شمالی</option> 
</select>

{formik.touched.province && formik.errors.province && (
    <div className="text-red-500 text-xs font-semibold col-start-2 col-end-3 ">
        {formik.errors.province}
    </div>
)}
</div>
<div className="flex flex-col mt-2 w-full md:ml-5 md:w-[250px]">
<label className="intro-x text-slate-600 mb-1 text-sm">
    شهرستان
</label>
<select
    name="city"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    id="city"
    className="w-full block text-sm shadow-sm border border-slate-200 rounded-md mb-1 px-4 py-3 placeholder:text-slate-400/90 placeholder:text-xs focus:ring-4 focus:ring-primaryOne focus:ring-opacity-20 focus:border-primaryOne focus:border-opacity-40 focus-visible:outline-0 intro-x "
>
    <option value="None">انتخاب شهر</option>
    {formik.values.provinces &&
        formik.values.provinces.map((r) => (
            <option key={r.id} value={r.value}>
                {r.title}
            </option>
        ))}
</select>

{formik.touched.province && formik.errors.province && (
    <div className="text-red-500 text-xs font-semibold col-start-2 col-end-3 ">
        {formik.errors.province}
    </div>
)}
</div> */}