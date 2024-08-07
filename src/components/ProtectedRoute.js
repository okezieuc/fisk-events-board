import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    return (user) ? children : null;
};

export default ProtectedRoute;