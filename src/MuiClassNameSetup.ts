import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/material/className';

ClassNameGenerator.configure(
  // Do something with the componentName
  (componentName) => {
    return componentName.replace('Mui', 'yatochka-').toLowerCase();
  },
);