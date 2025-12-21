import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';
import logo from '../assets/images/Logo.png';

const Footer = () => {
  return (
    <div className=" bg-gray-100 text-gray-700 py-6 h-[250px] mt-auto">

<div className="flex justify-between items-center px-6">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="h-20" />
        </div>

        <div className="flex space-x-6 text-xl">
          <a href="https://www.facebook.com" className=" text-[30px] text-blue-600"><FaFacebook /></a>
          <a href="https://instagram.com" className=" text-[30px] text-pink-600"><FaInstagram /></a>
          <a href="https://twitter.com" className=" text-[30px] text-blue-400"><FaTwitter /></a>
          <a href="https://linkedin.com" className=" text-[30px] text-blue-700"><FaLinkedin /></a>
          <a href="https://youtube.com" className=" text-[30px] text-red-600"><FaYoutube /></a>
        </div>
      </div>


      <hr className="my-4 mx-auto border-black w-[95%] border-t-1 opacity-100" />

      <div className="flex justify-center items-center space-x-9">
        <div className="text-sm">
          <span className='font-semibold text-[20px]'>Copyright © Shoes Store</span>
        </div>

        <div className="space-x-4 text-sm">
          <a href="#" className=" underline">Private Policies</a>
          <a href="#" className=" underline">Terms of Use</a>
          <a href="#" className=" underline">Cookie Policy</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
