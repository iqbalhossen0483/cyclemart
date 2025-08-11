import { useContext } from 'react';
import { AuthFunction } from '../../AllProvider/FunctionProvider';

const useFunc = () => {
    return useContext(AuthFunction)
};

export default useFunc;