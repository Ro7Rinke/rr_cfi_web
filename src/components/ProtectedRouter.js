import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const authToken = useSelector((state) => state.authToken)
    // const [hasRedirected, setHasRedirected] = useState(false);

    const shouldRedirect = !authToken.access

    useEffect(() => {
        // if (shouldRedirect && !hasRedirected) {
        //     setHasRedirected(true); // Marca como redirecionado
        //   }
    }, [shouldRedirect]);

    if (shouldRedirect) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children; // Renderiza os filhos se não houver redirecionamento
};

export default ProtectedRoute;