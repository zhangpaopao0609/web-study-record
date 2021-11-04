type T0 = {
  name: T0;
};

type Json = 
  | string
  | number
  | boolean
  | null
  | { [property: string]: Json }
  | Json[];
