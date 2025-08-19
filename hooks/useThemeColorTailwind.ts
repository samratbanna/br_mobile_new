import { useMemo } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '~/tailwind.config';


const useTailwindColors = () => {
  const fullConfig = useMemo(() => resolveConfig(tailwindConfig), []);
  const colors = useMemo(() => fullConfig.theme?.colors || {}, [fullConfig]);

  return colors;
};

export default useTailwindColors;