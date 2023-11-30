import { useState } from "react";
import { useNavigate } from "react-router-dom"

export default function UploadComponent() {

    const [flag, setFlag] = useState(false);
    const [imageurl, setImageurl] = useState("");
    const [foodName, setFoodName] = useState("");
    const navigate = useNavigate();


    function UploadImage() {
        if (!flag) {
            return (
            <div>
                <form method="post" onSubmit={handleSubmit}>
                    <input type="file" name="food_image"/>
                    <button type="submit">submit</button>
                </form>
            </div>)
        }
        else {
            return null;
        }
    }



    function UploadReview() {
        function handlefoodNameChange(event) {
            setFoodNameTemp(event.target.value);
        }
        function handleScoreChange(event) {
            setScore(event.target.value);
        }
        const [foodNameTemp, setFoodNameTemp] = useState(foodName);
        const [score, setScore] = useState(5);

        function handleSubmit() {
            alert("업로드 성공!");
            navigate('/home');
        }

        if (flag) {
            return (
            <div>
                <div>
                    <img src={imageurl} width={500} height={500} alt={foodName}/>
                </div>
                <input type="text" name="foodName" value={foodNameTemp} onChange={handlefoodNameChange} />
                <input type="range" name="score" min={0} max={5} onChange={handleScoreChange}/>
                <label>{score}</label>
                <button onClick={handleSubmit}>submit</button>
            </div>
            );
        }
        else {
            return null;
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        console.log(data);
        fetch('http://localhost:8000/food_recognition', {
            method: form.method, body: formData
        }).then(response => response.json())
        .then(response => {
            console.log(response.food);
            setFoodName(response.food);
            setFlag(true);
            setImageurl(URL.createObjectURL(data.food_image));
        })
    }

    return (
        <div>
            <UploadImage />
            <UploadReview />
        </div>
    );
}
