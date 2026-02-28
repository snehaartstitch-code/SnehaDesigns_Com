import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Category = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to the shop page with the category filter applied
        navigate(`/shop?category=${slug}`, { replace: true });
    }, [slug, navigate]);

    return (
        <div className="section-padding text-center">
            <p>Redirecting to Category...</p>
        </div>
    );
};

export default Category;
