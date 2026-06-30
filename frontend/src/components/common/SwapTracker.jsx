import React from 'react'
import {Step,Stepper,StepLabel,Box} from "@mui/material";
import { Check } from 'lucide-react';

 const steps=[
        "requested",
        "accepted",
        "chaatting",
        "completed",
       
    ];

    function getStatus(status){
        switch (status){
            case "requested":return 0;
            case "accepted": return 1;
            case "chatting" :return 2;
            case "completed": return 3;
           
            default:return 0;
        }
    }
function SwapTrack({status}) {
   const activeStep=getStatus(status);
   console.log(activeStep)


    
  return (
    <div>
     <h1 className="text-center  font-semibold text-green-900 text-2xl py-2 pb-6">swap tracking status</h1>
    <div className="flex justify-center">
       
        {/* <Box sx={{width:"100%",mt:2}}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((step,index)=>{
                    <Step key={index}>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                })}
            </Stepper>
            <Box sx={{mt:2}}>
                {status ==="completed" && <p>swap process completed</p>}
                {status ==="rejected" && <p>swap request was rejected</p>}
            </Box>
        </Box> */}
    <div className="flex gap-20">

        {steps.map((step,index)=>(
            <div key={index} >
            <div className={`h-20 w-20 rounded-full ${index === activeStep ? "bg-blue-400" : index < activeStep ? "bg-green-400 duration-1000" : "bg-gray-300"} flex justify-center items-center`}>
                {index>=activeStep?index+1:<Check/>}</div>
            <div className="text-center" >{step}</div>
            </div>
        ))}
    </div>
    </div>
    </div>
  )
}

export default SwapTrack;