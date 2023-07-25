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

export const useFetchRecipientUser = (chat: any, user: any) => {
    const [recipientUser, setRecipientUser] = useState<recipientUserType | null>(null);
    const [ error, setError] = useState(null);

    const recipientId = chat?.members.find((id:any) => id !==user?._id);
    // console.log("chat fetch", chat);
    useEffect(()=> {
        const getUser = async () => {
            
            if(!recipientId) return null;

            const response = await postRequest(`${baseUrl}/users/find/${recipientId}`, JSON.stringify({}) );
        
            if(response.error){
                return setError(error);
            }
            console.log("recipient data", response);
            setRecipientUser(response);
        }

        getUser();
    }, [])

    return {recipientUser};
}