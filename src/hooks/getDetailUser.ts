import { useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/service";

type recipientUserType = {
    _id: string | undefined ;
    name: string;
    email: string;
    codereferral: string;
    createdAt: any;
    updatedAt: any;


}

export const getDetailUser = (userId: any) => {
    const [detailUser, setDetailUser] = useState<recipientUserType>();
    const [ error, setError] = useState(null);

    // console.log("chat fetch", chat);
    useEffect(()=> {
        const getUser = async () => {
            
            if(!userId) return null;

            const response = await postRequest(`${baseUrl}/users/find/${userId}`, JSON.stringify({}) );
        
            if(response.error){
                return setError(error);
            }
            console.log("recipient data", response);
            setDetailUser(response);
        }

        getUser();
    }, [])

    return {detailUser};
}