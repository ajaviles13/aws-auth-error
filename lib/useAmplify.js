import { useState, useEffect } from 'react';

const useAmplify = (funcPass) =>{
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    const fetchData = async () => {
        setIsLoading(true);

        try{
            const response = await funcPass();
            setData(response);
        }catch(error){
            Alert.alert('Error', error.message);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => { 
        fetchData(); 
    }, []);

    const refetch = () => fetchData();

    return { data, isLoading, refetch };
}

export default useAmplify;