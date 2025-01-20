import { useState,useEffect } from 'react'
import HackathonDetailsDisplay from '../../components/HackathonComponents/HackathonDetailsDisplay';
import HackathonTimingsDisplay from '../../components/HackathonComponents/HackathonTimingsDisplay';
import Header from '../../components/Header';
import { useParams } from 'react-router-dom';
import ReactingNavBar from '../../components/ReactingNavBar';
import { motion } from "framer-motion";


function HackathonWebpage() {
    const { name } = useParams();

    useEffect(() => {

    },[]);

    return(
        <>
        <div className='flex '>
            <ReactingNavBar/>
            <div className='space-y-3 size-full'>
            <Header></Header>



            

                        <motion.div
                            className="fixed right-[400px] bottom-[170px] h-24 w-24 rounded-xl bg-blue-300"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 2 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        />
                        <motion.div
                            className="fixed right-[400px] bottom-[230px] h-32 w-48 rounded-full bg-yellow-400"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1.2 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        />
                        <motion.div
                            className="fixed bottom-[140px] right-[320px] h-24 w-24 rounded-full bg-purple-400"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        />


<motion.div>
  <motion.svg
    className="line-animation fixed bottom-[50px] right-[500px] w-32 h-32"
    initial={{ pathLength: 0 }}
    whileInView={{ pathLength: 1 }}
    transition={{ duration: 2 }}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      d="M10 10 Q 50 50, 90 10"
      fill="transparent"
      stroke="#3b82f6"
      strokeWidth="4"
    />
  </motion.svg>
</motion.div>



<motion.div>
  <motion.svg
    className="line-animation fixed bottom-[60px] right-[500px] w-32 h-32"
    initial={{ pathLength: 0 }}
    whileInView={{ pathLength: 1 }}
    transition={{ duration: 2 }}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      d="M10 90 C 30 60, 70 60, 90 90"
      fill="transparent"
      stroke="#3b82f6"
      strokeWidth="4"
    />
  </motion.svg>
</motion.div>







            <div className=''style={{display:"flex", justifyContent:"center"}}>
                <div style={{marginTop:"30px"}}>
                    {/* <div style={{height:"300px",width:"100px"}}/> */}
                    <div className="flex">
                        <div>
                            <HackathonDetailsDisplay name={name}/>
                        </div>
                        <div>
                            <HackathonTimingsDisplay id={name} flag={1} />
                        </div>
                    </div>
                </div>
            </div> 
            </div>
        </div>
              
        </>
    );     

}

export default HackathonWebpage