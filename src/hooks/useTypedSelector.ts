import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

export const useTypedSelector = <TSelected>(
  selector: (state: RootState) => TSelected
) => useSelector(selector);
