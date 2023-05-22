import React, {useEffect, useState} from 'react';

const useDebounce = (value:any, delay:number)=> {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {

            //create newTimeoute
            const timer = setTimeout(() => {
                setDebounceValue(value)
            }, delay||500)

            //clearing oldTimer
            return () => {
                clearTimeout(timer)
            }
        }, [value, delay])
}
export default useDebounce;