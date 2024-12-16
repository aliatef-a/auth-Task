import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import useRegister from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        password_confirmation: "",
    });
    const [errors, setErrors] = useState({});
    const { register, loading, error } = useRegister();
    const { setIsAuthenticated } = useAuth();
    const navigate = useNavigate();
    const validate = () => {
        const newErrors = {};

        if (!formData.name) {
            newErrors.name = "اسم المستخدم مطلوب";
        } else if (formData.name.length < 3) {
            newErrors.name = "اسم المستخدم يجب أن يكون على الأقل 3 أحرف";
        }

        if (!formData.email) {
            newErrors.email = "البريد الإلكتروني مطلوب";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "البريد الإلكتروني غير صالح";
        }

        if (!formData.password) {
            newErrors.password = "كلمة المرور مطلوبة";
        } else if (formData.password.length < 6) {
            newErrors.password = "كلمة المرور يجب أن تكون على الأقل 6 أحرف";
        }

        if (!formData.password_confirmation) {
            newErrors.password_confirmation = "تأكيد كلمة المرور مطلوب";
        } else if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = "كلمة المرور وتأكيد كلمة المرور غير متطابقتين";
        }

        if (!formData.mobile) {
            newErrors.mobile = "رقم الهاتف مطلوب";
        } else if (!/^[0-9]{10,15}$/.test(formData.mobile)) {  // Allow 10 to 15 digits for mobile
            newErrors.mobile = "رقم الهاتف غير صالح";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const result = await register(formData);
                toast.success("تم تسجيل البيانات بنجاح");
                console.log("Form Data Sent to API:", formData);

                const { data } = result;
                console.log("data Regist", data);
                localStorage.setItem('data', JSON.stringify(data));
                localStorage.setItem('token', data.token);
                setIsAuthenticated(true);
                navigate('/test-auth');
            } catch (err) {

                if (err?.response?.data?.errors) {
                    Object.keys(err.response.data.errors).forEach((field) => {
                        err.response.data.errors[field].forEach((message) => {
                            toast.error(message);
                        });
                    });
                } else {
                    toast.error("حدث خطأ أثناء التسجيل");
                }
            }
        } else {
            toast.error("يرجى تصحيح الأخطاء قبل المتابعة");
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">تسجيل الدخول</h2>

                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        اسم المستخدم
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="أدخل اسم المستخدم"
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        البريد الإلكتروني
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="أدخل البريد الإلكتروني"
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="mobile"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        رقم الهاتف
                    </label>
                    <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="أدخل رقم الهاتف"
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.mobile ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        كلمة المرور
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="أدخل كلمة المرور"
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="password_confirmation"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        تأكيد كلمة المرور
                    </label>
                    <input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        placeholder="أدخل تأكيد كلمة المرور"
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password_confirmation ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.password_confirmation && <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>}
                </div>



                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    {loading ? "جاري التسجيل..." : "تسجيل الدخول"}
                </button>
            </form>
            <Toaster />
        </div>
    );
};

export default Register;
