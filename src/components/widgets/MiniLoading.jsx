import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ClipLoader } from 'react-spinners';

import logo from '../../assets/images/ask-logo.png';



function Loading({  }) {

    const navigate = useNavigate();

    return (
      <>
        <div className="flex py-2 z-50">
          <ClipLoader size={29} color={"#161c34"} loading={true} /> 
        </div>
      </>    
    );
}

export default Loading;
