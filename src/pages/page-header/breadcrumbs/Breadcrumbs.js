import React from 'react';
import { useSelector } from 'react-redux';
import useTranslator from '../../../hooks/useTranslator';
import HICBreadcrumb from '../../../components/HICBreadcrumb';

const Breadcrumbs = () => {
  const { t } = useTranslator();
  const breadcrumbsState = useSelector((state) => state.breadcrumbs || {});
  const breadcrumbs = breadcrumbsState.breadcrumbs || []; // Default to empty array

  if (breadcrumbs.length === 0) {
    return null;
  }

  const formattedBreadcrumbs = breadcrumbs.map(({ i18nKey, text, location }, index) => {
    const label = i18nKey ? t(i18nKey) : text;
    const isLast = index === breadcrumbs.length - 1;
    return {
      label,
      to: !isLast ? location : null,
    };
  });

  return <HICBreadcrumb breadcrumbs={formattedBreadcrumbs} />;
};

export default Breadcrumbs;