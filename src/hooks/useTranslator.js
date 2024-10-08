import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export default function useTranslator() {
  const { t } = useTranslation();

  const translate = useCallback((key) => (key !== undefined ? t(key) : ''), [t]);

  return {
    t: translate,
  };
}