import { useState, useEffect } from 'react';

const useOnBoarding = () => {
    const [isOnBoardingComplete, setIsOnBoardingComplete] = useState<boolean>(() => {
        const savedValue = localStorage.getItem('onBoardingComplete');
        return savedValue ? JSON.parse(savedValue) : false;
    });

    useEffect(() => {
        localStorage.setItem('onBoardingComplete', JSON.stringify(isOnBoardingComplete));
    }, [isOnBoardingComplete]);

    const completeOnBoarding = () => {
        setIsOnBoardingComplete(true);
    };

    return {
        isOnBoardingComplete,
        completeOnBoarding,
    };
};

export default useOnBoarding;
