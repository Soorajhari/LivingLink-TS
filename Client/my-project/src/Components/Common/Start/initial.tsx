import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Initial() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/landing");
    }, 5000);
  }, [navigate]);

  return (
    <div>
  <div className="bg-blue-700 h-screen flex flex-col justify-center items-center text-center relative">
      <div className="absolute top-0 left-0 m-8">
        <img
          src={require("../../Assets/images/a-logo-for-house-related-web-application.png" )}
          alt="hoem icon"  className="w-[50px] h-[50px]"
        />
      </div>

      <h3 className="text-white text-4xl font-bold ">LivingLink</h3>
      <p className="text-white text-xl mt-4">Home Designs & Professionals</p>
    </div>
    <div></div>
    </div>
  
  );
}

export default Initial;
