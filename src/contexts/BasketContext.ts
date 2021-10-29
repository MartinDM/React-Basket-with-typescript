import React, { createContext, useState, useContext  } from 'react'; 
import { IProduct } from '../productData';

export const BasketContext = createContext<IProduct[]>([]);

