import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react";
import { OracaoEucaristica } from "../../data/oracaoData";
import socket from "../../socket";

export function Control(){
    const [currentOrder, setCurrentOrder] = useState(0);
    const [currentAclamacao, setCurrentAclamacao] = useState(0);
    const [show, setShow] = useState("");
    
    const oracao = OracaoEucaristica[0].oracoes[currentOrder];
    const displayContent = oracao.aclamacoes
    ? oracao.aclamacoes[currentAclamacao]
    : oracao;

    useEffect(()=>{
        setShow(nomeOracao);
    }, [])
    
    if (currentOrder == -1) {
        setCurrentOrder(0);
        setCurrentAclamacao(0);
    }


  const handleNext = () => {
        const current = currentOrder + 1;
        if(current >= OracaoEucaristica[0].oracoes.length){
            setCurrentOrder(currentOrder);
        }else{
            setCurrentOrder(current);
            setCurrentAclamacao(0);
        }
      
  };

  const handlePrev = () => {
    const current = currentOrder - 1;

    if(current === -1){
        setCurrentOrder(0);
        setCurrentAclamacao(0);
        setShow(OracaoEucaristica[0].nome)

    }
    else{
        setCurrentOrder(current);
        setCurrentAclamacao(0);
    }

};

  if (currentOrder >= OracaoEucaristica[0].oracoes.length) {
    return <div className="oracao">Fim da Oração Eucarística II</div>;
  }


 
    console.log(displayContent)
    const nomeOracao = currentOrder === 0 ? OracaoEucaristica[0].nome : displayContent.assembleia;


    function setOracaoShow(oracao:string){
        setShow(oracao)
        const message:string[] =[];
        message.push(oracao)
        socket.emit('message', message);
        handleNext()
    }
    return (
        <div className="flex flex-col items-center py-2 gap-7 bg-gray-950 h-screen font-sans">
            <div className="h-48 w-11/12 bg-black rounded border-solid border border-green-500 
                flex justify-center items-center p-5 text-center">
                <p className="text-white font-bold">{show}</p>
            </div>
            <div className="flex gap-2 absolute top-44 my-0.5">
                <button className="bg-green-500 w-32 flex justify-center rounded p-1" onClick={handlePrev}><ChevronLeft color="white" size={30}/></button>
                <button className="bg-green-500 w-32 flex justify-center rounded p-1" onClick={handleNext}><ChevronRight color="white" size={30}/></button>
            </div>
            <div className="flex flex-col gap-2">
            {
                oracao.aclamacoes ? (oracao.aclamacoes.map((aclamacao, index) => (
                    <div key={index} >
                        <button className="text-white border-solid border border-green-500 
                                rounded-lg px-1 py-3 w-80 border-gray-700 font-bold 
                             active:opacity-60 bg-green-950"  onClick={() => {setOracaoShow(aclamacao.assembleia)}}>R. {aclamacao.sacerdote}</button>
                    </div>
                ))) : (
                    <div className="flex flex-col items-center gap-2">
                        <div className="">
                            <p className="text-white px-6 text-center text italic">{displayContent.sacerdote}</p>
                        </div>
                        <button className="text-white border-solid border border-green-500 
                        rounded-lg p-4 w-80 border-gray-700 font-bold 
                        active:opacity-60 bg-emerald-950" onClick={() => {setOracaoShow(displayContent.assembleia)}}>R. {displayContent.assembleia}</button>
                    </div>
                  )
            }
            </div>
            

            
            
        </div>
    )
}