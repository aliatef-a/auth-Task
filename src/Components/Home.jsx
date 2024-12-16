import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("data");

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                console.log("User Data from LocalStorage:", parsedUser);
                setUserData(parsedUser);
            } catch (error) {
                console.error("Error parsing user data:", error);
                setUserData(null);
            }
        } else {
            console.log("No user data found in LocalStorage");
        }
    }, []);

    const handleLogout = () => {

        localStorage.removeItem("data");
        localStorage.removeItem("token");
        navigate("/register");
    };

    return (
        <section className="flex items-center justify-center h-screen">
            {userData ? (
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Welcome, {userData.name}!</h1>
                    <p className="text-lg">Mobile: {userData.mobile}</p>
                    <button
                        onClick={handleLogout}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                        تسجيل الخروج
                    </button>
                </div>
            ) : (
                <p className="text-center text-xl">No user data found. Please log in.</p>
            )}
        </section>
    );
};

export default Home;
