import { useEffect, useState } from "react"
import socket from "../../socket";
import './styles.css'

export function Presentation(){
    const [message, setMessage] = useState<string[]>();

    useEffect(()=>{
        socket.on('message',(msg:string[])=>{setMessage(msg)})
    },[]);
    console.log(message)
    return(
        <div className="flex justify-center bg-black h-screen items-center flex-col m-0">
            {message?.map((value, index)=>(
                   <p key={index} className="text-white text-7xl text-center font-bold font-serif px-24 py-6 uppercase">{value}</p>
            ))}
        </div>
    )
}