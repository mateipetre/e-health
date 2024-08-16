import { useRef, useEffect } from 'react';

export default function useUpdateEffect(effect, dependencies) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (effect) {
      return effect();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies]);
}
