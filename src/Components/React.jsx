
import { useState } from "react"
import { Link, Outlet } from "react-router-dom"
import LandingPageCitizen from "./content/LandingPageCitizen"
import { successToast } from "../Toast"
function LandingLayout() {
    const [selectLink, setSelectLink] = useState('citizenlanding')

    //code
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const totalQuestions = 5;

    const questions = [
        {
            id: 1,
            text: "What is the national bird of India?",
            options: ["Hen", "Parrot", "Eagle", "Peacock"],
            answer: "Peacock"
        },
        {
            id: 2,
            text: "What is the national animal of India?",
            options: ["Cow", "Tiger", "Sheep", "Leopard"],
            answer: "Tiger"
        },
        {
            id: 3,
            text: "Which is the national anthem of India?",
            options: ["Jana Gana Mana", "Vande Matharam", "Ma Thuje Salam", "Jai Ho"],
            answer: "Jana Gana Mana"
        },
        {
            id: 4,
            text: "What is the national flower of India?",
            options: ["Lilly", "Jasmine", "Lotus", "Daisy"],
            answer: "Lotus"
        },
        {
            id: 5,
            text: "What is the capital of India?",
            options: ["Delhi", "Mumbai", "Pune", "Kerala"],
            answer: "Delhi"
        }
    ];

    const [formData, setFormData] = useState({});
    const [score, setScore] = useState(0);

    const handleOptionSelect = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleNextClick = () => {
        setCurrentQuestion(currentQuestion + 1);
        let count = 0;
        for (let i = 1; i <= totalQuestions; i++) {
            const question = questions.find(q => q.id === i);
            if (formData[`Q${i}`] === question.answer) {
                count++;
            }
        }
        setScore(count);
    };

    const handleSubmit = () => {
        successToast(`${score} Answers Correct`);
    };
    //code
    return (
        // <div className="justify-center flex">   
        //     {/* Header Begins */}
        //     <div className="fixed w-[98.8%] text-[#213361] text-sm bg-white h-[75px] flex justify-between border-[2px] border-[#213361] items-center rounded-[20px] m-3 lg:text-2xl xl:text-3xl sm:text-sm">
        //         <div className="items-start flex m-auto ml-[20px] w-1/4">
        //             <b><Link to={'/'}>OpenGov</Link></b>
        //         </div>
        //         <div className="flex gap-4   pe-6 justify-end m-auto mr-3 w-full items-center h-auto">
        //             <ul className="flex gap-9 md:text-2xl sm:text-[20px] lg:text-3xl ">
        //                 <li onClick={()=>setSelectLink('citizenlanding')} className={`${selectLink === 'citizenlanding' ? 'border-[2px] border-[#213361] rounded-[20px] p-1':""}`}><Link to={'/'}>Citizens</Link></li>
        //                 <li onClick={()=>setSelectLink('govtlanding')} className={`${selectLink === 'govtlanding' ? 'border-[2px] border-[#213361] rounded-[20px] p-1':""}`}><Link to={'/govtlanding'}>Govt.</Link></li>
        //                 <li onClick={()=>setSelectLink('companylanding')} className={`${selectLink === 'companylanding' ? 'border-[2px] border-[#213361] rounded-[20px] p-1':""}`}><Link to={'/companylanding'}>Company</Link></li>
        //                 <li onClick={()=>setSelectLink('signin')} className={`${selectLink === 'signin' ? 'border-[2px] border-[#213361] rounded-[15px] p-1':"text-white p-1 rounded-[20px] bg-[#213361]"}`}><Link to={'/signin'}>LogIn / SignUp</Link></li>
        //             </ul>
        //         </div>
        //     </div>
        //     {/* Header Ends */}
        //     {/* Body Begins */}
        //     <div className="flex overflow-scroll overflow-x-hidden fixed top-20 m-3 w-full h-[88.7vh] border-[2px] border-[#213361] rounded-[20px] ">
        //         <Outlet />
        //     </div>
        // </div>
        <div className="justify-center flex flex-col">
            <h1>Quiz App</h1>
            <br />
            {currentQuestion <= totalQuestions ? (
                <div className="felx justify-center flex-col">
                    <h3>Question {currentQuestion}:</h3>
                    <p>{questions[currentQuestion - 1].text}</p>
                    <div className="flex flex-row gap-3">
                        {questions[currentQuestion - 1].options.map((option, index) => (
                            <label key={index}>
                                <input type="radio" name={`Q${currentQuestion}`} value={option} onClick={handleOptionSelect}/>
                                {option}
                            </label>
                        ))}
                    </div>
                    Score: {score}
                    <br />
                    <button onClick={handleNextClick}>Next</button>
                </div>
            ) : (
                <div>
                    <p>Completed! Please Submit</p>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            )}
        </div>
    )
}
export default LandingLayout    