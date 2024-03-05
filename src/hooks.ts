// src/hooks.ts (or anywhere you prefer in your project structure)
import { useDispatch as useReduxDispatch } from 'react-redux';
import type { AppDispatch } from './store/store'; // Adjust the import path as needed

export const useDispatch = () => useReduxDispatch<AppDispatch>();
