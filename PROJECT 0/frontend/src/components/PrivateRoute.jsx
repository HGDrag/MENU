import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react'
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const AuthRoute = () => {
    const {userInfo} = useSelector((state) => state.auth)
    return userInfo ? <Outlet /> : <Navigate to='/login' replace /> 
}

const RoleRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const [hasShownToast, setHasShownToast] = useState(false);

    useEffect(() => {
        if (!userInfo && !hasShownToast) {
            toast.warning('Continue As Admin.');
            setHasShownToast(true);
        } else if (userInfo && userInfo.role !== 'Admin' && !hasShownToast) {
            toast.error('Access denied. Admins only.');
            setHasShownToast(true);
        }
    }, [userInfo, hasShownToast]);

    if (!userInfo) {
        return <Navigate to='/login' replace />;
    }

    if (userInfo.role === 'Admin') {
        return <Outlet />;
    }

    return <Navigate to='/products' replace />;
};

export default RoleRoute;


export { AuthRoute, RoleRoute }