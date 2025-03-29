import React, { useState, useContext } from 'react'
import './Sidebar.css'
import geminilogo from '../../assets/geminilogo.png'
import { CiMenuBurger } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { RiMessage3Line } from "react-icons/ri";
import { IoIosHelpBuoy } from "react-icons/io";
import { MdHistory } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { Context } from '../../context/Context';

const Sidebar = () => {


    const [extended, setExtended] = useState(false)
    const {onSent,prevPrompts,setRecentPrompt,newChat} = useContext(Context);


    const  loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }
    
  return (
    <div className='sidebar'>
        <div className="top">
            {/* <img src={} alt="" /> */}
            <a onClick={()=>setExtended(prev=>!prev)} className='menu'><CiMenuBurger /></a>
            <div onClick={()=>newChat()} className="new-chat">
                <a className='menu-icon'><FaPlus /></a>
                {extended?<p>New chat</p>:null}
            </div>
            {extended?<div className="recent">
                <p className="recent-title">Recent</p>
                {prevPrompts.map((item,index)=>{
                    return(
                        <div onClick={()=>loadPrompt(item)}className="recent-entry">
                <a><RiMessage3Line /></a>
                <p>{item.slice(0,16)}..</p>
                </div>
                    )
                })}
                
            </div>:null}
            
        </div>
        <div className="bottom">
            <div className="bottom-item recent-entry">
            <a><IoIosHelpBuoy /></a>
            {extended?<p>Help</p>:null}
            {/* <a className='icon'>Help</a> */}
            </div>
            <div className="bottom-item recent-entry">
            <a><MdHistory /></a>
            {extended?<p>Activity</p>:null}
            {/* <a className='icon'>Activity</a> */}
            </div>
            <div className="bottom-item recent-entry">
            <a><IoMdSettings /></a>
            {extended?<p>Help</p>:null}
            {/* <a className='icon'>Settings</a> */}
            </div>
        </div>
    </div>
  )
}

export default Sidebar