import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"
import React, { useEffect } from "react";

type ProtectedRouteProps = {
    children: React.ReactElement
};

const ProtectedRoute = (props: ProtectedRouteProps) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    return (user) ? props.children : null;
};

export default ProtectedRoute;