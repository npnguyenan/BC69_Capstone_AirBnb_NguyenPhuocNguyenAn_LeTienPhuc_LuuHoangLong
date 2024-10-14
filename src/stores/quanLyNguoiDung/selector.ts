import { useSelector } from 'react-redux'
import { RootState } from '..'

export const useuserSelector = () =>
    useSelector((state: RootState) => state.userReducer)
