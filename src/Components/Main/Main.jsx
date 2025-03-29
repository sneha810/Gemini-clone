import React, { useContext } from 'react'
import './Main.css'
import { FaRegUserCircle } from "react-icons/fa";
import { ImCompass } from "react-icons/im";
import { IoBulbOutline } from "react-icons/io5";
import { BsCode } from "react-icons/bs";
import { GrGallery } from "react-icons/gr";
import { FaMicrophone } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { Context } from '../../context/Context';
import geminilogo from '../../assets/geminilogo.png';
const Main = () => {

    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context)
    return (
        <div className='main'>
            <div className="nav">
                <p>Gemini</p>
                {/* <a className='img'><FaRegUserCircle /></a> */}
                {/* <img className='img' src="https://models-online-persist.shakker.cloud/img/036c4f69b4b94e0b87160f469655f4be/61838927c7883ac9fd5e305e0841ecd8b340e5bd60c93d239c5fa86064d07691.jpg" alt="" /> */}
                <img className='img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe-qI0MbpRQvc4fYTS4UJ52-Btg144526CeeDHpKBVEwgxw5bg7RjiipfeaXyGWJhec-g&usqp=CAU" alt="" />
            </div>
            <div className="main-container">
                {!showResult ?
                    <>
                        <div className="greet">
                            <p>
                                <span>Hello,devi</span>
                            </p>
                            <a>How can i help you today</a>
                        </div>
                        <div className="cards">
                            <div className="card" onClick={
                                async()=>{
                                await setInput("coding 1") 
                                onSent()

                            }}>
                                <p>coding 1</p>
                                <a onClick={() => onSent()} className='card-icon'><ImCompass /></a>
                            </div>
                            <div className="card" onClick={
                                async()=>{
                                await setInput("how to grow my youtube channel") 
                                onSent()

                            }}>
                                <p>how to grow my youtube channel</p>
                                <a className='card-icon'><IoBulbOutline /></a>
                            </div>
                            <div className="card" onClick={
                                async()=>{
                                await setInput("what's the currency of bitcoin") 
                                onSent()

                            }}>
                                <p>what's the currency of bitcoin</p>
                                <a className='card-icon'><ImCompass /></a>
                            </div>
                            <div className="card" onClick={
                                async()=>{
                                await setInput("write a javascript code to summ all the elements in an array") 
                                onSent()

                            }}>
                                <p>write a javascript code to summ all the elements in an array</p>
                                <a className='card-icon'><BsCode /></a>
                            </div>
                        </div>
                    </>
                    :
                    <div className='result'>
                        <div className="result-title">
                            {/* <img className='user-profile'  src="https://beauty-around.com/images/sampledata/British_men/Danny-Schwarz.jpg" alt="" /> */}
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe-qI0MbpRQvc4fYTS4UJ52-Btg144526CeeDHpKBVEwgxw5bg7RjiipfeaXyGWJhec-g&usqp=CAU" alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={geminilogo} style={{ width: 30 }} alt="" />
                            {loading ?
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }

                        </div>
                    </div>
                }

                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Ask Gemini' />
                        <div>
                            <a className="search-box-icon"><GrGallery /></a>
                            <a className="search-box-icon"><FaMicrophone /></a>
                            {input ?
                                <a onClick={() => onSent()} className="search-box-icon"><IoSend /></a>
                                : null
                            }

                        </div>
                    </div>
                    <p className='bottom-info'>Gemini may display inaccurate info, including about people, so double-check its responses. your privacy and Gemini Apps.</p>
                </div>
            </div>
        </div>
    )
}

export default Main