import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../components/Button";
import { CanticoEntrada } from "../../data/canticosData";
import { useState, useRef, useEffect } from "react";
import socket from "../../socket";

export function Canticos() {
    const cantico = CanticoEntrada[0];
    const [activeId, setActiveId] = useState(0);
    const  [estrofe, setEstrofe] = useState("");
    const buttonRefs = useRef([]);

    useEffect(() => {
        if (buttonRefs.current[activeId]) {
            buttonRefs.current[activeId].scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [activeId]);

    function setButtonActive(id: number) {
        setActiveId(id);
    }

    function Next() {
        if (activeId < cantico.letra.length - 1) {
            setActiveId(activeId + 1);
           
        }
    }

    function Prev() {
        if (activeId > 0) {
            setActiveId(activeId - 1);
        }
    }
    const teste = cantico.letra.find((teste) => teste.order === activeId)?.estrofes;
    socket.emit('message', teste);
    return (
        <div className="flex flex-col items-center py-5 bg-gray-950 h-screen font-sans">
            <div className="z-0 fixed h-48 w-11/12 bg-black rounded border-solid border border-green-500 
                flex justify-center items-center p-5 text-center flex flex-col">
                {cantico.letra.find((teste) => teste.order === activeId)?.estrofes.map((value, index) => (
                    <p key={index} className="text-white font-bold">{value}</p>
                ))}
            </div>
            <div className="fixed flex flex-col w-full z-50 items-center translate-y-[9.5rem] gap-3 h-3/4 py-5">
                <div className="flex gap-2">
                    <button className="bg-green-500 w-32 flex justify-center rounded p-1" onClick={Prev}><ChevronLeft color="white" size={30} /></button>
                    <button className="bg-green-500 w-32 flex justify-center rounded p-1" onClick={Next}><ChevronRight color="white" size={30} /></button>
                </div>
                <div className="flex flex-col items-center gap-2 overflow-y-auto">
                    {cantico.letra.map((value, index) => (
                        <Button
                            key={value.order}
                            text={value.estrofes}
                            active={activeId === value.order ? true : false}
                            onClick={() => { setButtonActive(value.order); }}
                            ref={(el) => buttonRefs.current[index] = el}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
