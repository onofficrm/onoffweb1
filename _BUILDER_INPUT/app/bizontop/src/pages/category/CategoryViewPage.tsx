import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getCategoryById } from '../../data/productData';
import { CategoryPageTemplate } from '../../components/product/CategoryPageTemplate';

interface CategoryViewPageProps {
  categoryId?: string;
  onOpenConsultation?: () => void;
}

export const CategoryViewPage: React.FC<CategoryViewPageProps> = ({
  categoryId: propCategoryId,
  onOpenConsultation,
}) => {
  const { categoryId: paramCategoryId } = useParams<{ categoryId: string }>();
  const activeCategoryId = propCategoryId || paramCategoryId || 'funding';

  const category = getCategoryById(activeCategoryId);

  if (!category) {
    return <Navigate to="/funding" replace />;
  }

  return (
    <CategoryPageTemplate
      category={category}
      onOpenConsultation={onOpenConsultation}
    />
  );
};
