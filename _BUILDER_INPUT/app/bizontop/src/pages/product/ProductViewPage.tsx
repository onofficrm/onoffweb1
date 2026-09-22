import React from 'react';
import { useParams, Navigate, useLocation } from 'react-router-dom';
import { getProductById } from '../../data/productData';
import { ProductDetailTemplate } from '../../components/product/ProductDetailTemplate';

interface ProductViewPageProps {
  onOpenConsultation?: () => void;
  defaultProductId?: string;
}

export const ProductViewPage: React.FC<ProductViewPageProps> = ({
  onOpenConsultation,
  defaultProductId,
}) => {
  const params = useParams<{
    productId?: string;
    fundId?: string;
    certId?: string;
    consultingId?: string;
  }>();
  const location = useLocation();

  // Determine productId from various possible URL param names or default
  const activeId =
    params.productId ||
    params.fundId ||
    params.certId ||
    params.consultingId ||
    defaultProductId;

  if (!activeId) {
    // If no ID specified, redirect to category page based on URL prefix
    if (location.pathname.startsWith('/funding') || location.pathname.startsWith('/policy-fund')) {
      return <Navigate to="/funding" replace />;
    }
    if (location.pathname.startsWith('/certification')) {
      return <Navigate to="/certification" replace />;
    }
    if (location.pathname.startsWith('/consulting')) {
      return <Navigate to="/consulting" replace />;
    }
    return <Navigate to="/" replace />;
  }

  const product = getProductById(activeId);

  if (!product) {
    // Fallback: If product not found, redirect to category
    if (location.pathname.startsWith('/funding') || location.pathname.startsWith('/policy-fund')) {
      return <Navigate to="/funding" replace />;
    }
    if (location.pathname.startsWith('/certification')) {
      return <Navigate to="/certification" replace />;
    }
    if (location.pathname.startsWith('/consulting')) {
      return <Navigate to="/consulting" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return (
    <ProductDetailTemplate
      product={product}
      onOpenConsultation={onOpenConsultation}
    />
  );
};
