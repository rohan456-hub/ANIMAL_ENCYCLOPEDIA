import React from 'react';
import { motion } from 'framer-motion';
import "./wave.css";

const AnimatedText = ({ text }) => {
    const words = text.split(' ');

    return (
        <div>
            <div className='mainy' style={{
               marginLeft:'', display: 'flex', overflow: 'hidden'
                , fontSize: '50px',  textShadow: "0px 10px 10px rgb(9,66,37) ",

                



            }}  >
                {words.map((word, index) => (
                    <motion.span className='mainb'
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                        style={{ marginRight: '10px' }}
                    >
                        {word}
                    </motion.span>
                ))}
            </div>


        </div>
    );
};

export default AnimatedText
