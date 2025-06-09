import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from './store';

// Typed version of useDispatch for proper TypeScript support in the app
export const useAppDispatch: () => AppDispatch = useDispatch;

// Typed version of useSelector so we get accurate types from our RootState
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
