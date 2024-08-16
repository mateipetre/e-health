import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addBreadcrumbs, removeBreadcrumbs } from './breadcrumbs-slice';

export default function useAddBreadcrumbs(breadcrumbs, withDashboard = false) {
  const dispatch = useDispatch();

  const breadcrumbsStringified = withDashboard
    ? JSON.stringify([...breadcrumbs, { i18nKey: 'dashboard.label', location: '/' }])
    : JSON.stringify(breadcrumbs);

  useEffect(() => {
    const breadcrumbsParsed = JSON.parse(breadcrumbsStringified);
    dispatch(addBreadcrumbs(breadcrumbsParsed));

    return () => {
      dispatch(removeBreadcrumbs(breadcrumbsParsed));
    };
  }, [breadcrumbsStringified, dispatch]);
}