import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { toast } from "react-hot-toast";
import axiosInstance from "../../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";
function ModeratorQuiz({navigateToOverview}) {
  const questions = [
    {
      question:
        "What criteria should a moderator consider first when assigning points to a product?",
      option1: "Product category",
      option2: "Product condition",
      option3: "Product quantity",
      option4: "User's address",
      answer: 2,
    },
    {
      question:
        "A user uploads a product with minor scratches. How should this affect the points assigned?",
      option1: "No points should be given",
      option2: "Slight reduction in points",
      option3: "Maximum points should be assigned",
      option4: "Moderate reduction in points",
      answer: 2,
    },

    {
      question: "Which product condition should receive the highest points?",
      option1: "Minor scratches",
      option2: "No Damage",
      option3: "Flawless",
      option4: "All conditions receive the same points",
      answer: 3,
    },

    {
      question:
        "When a product is listed in the 'electronics' category, what specific details should the moderator verify?",
      option1: "Product condition and brand",
      option2: "User's address and pincode",
      option3: "User's phone number",
      option4: "Number of quantities only",
      answer: 1,
    },
    {
      question:
        "If a user’s product listing lacks a clear image, what action should the moderator take?",
      option1: "Reject the listing",
      option2: "Assign fewer points",
      option3: "Ask the user to upload a better image",
      option4: "Ignore the image quality",
      answer: 1,
    },
    {
      question:
        "Which category is NOT one of the five given categories in the Trade Hub?",
      option1: "Books",
      option2: "Electronics",
      option3: "Toys",
      option4: "Clothing",
      answer: 3,
    },

    {
      question:
        "What is the first step a moderator should take when a new product request is received?",
      option1: "Check product condition",
      option2: "Verify user’s address and pincode",
      option3: "Review the product category",
      option4: "Check user’s phone number",
      answer: 1,
    },
    {
      question:
        "How should a moderator handle duplicate listings from the same user?",
      option1: "Approve all listings",
      option2: "Approve the first listing only",
      option3: "Reject all duplicate listings",
      option4: "Merge listings and assign points collectively",
      answer: 3,
    },
    {
      question:
        "A product in flawless condition should receive how many points compared to one with minor scratches?",
      option1: "Same points",
      option2: "Slightly more points",
      option3: "Significantly more points",
      option4: "Fewer points",
      answer: 3,
    },
    {
      question:
        "Which factor is least important when assigning points to a book?",
      option1: "Book condition",
      option2: "Book category",
      option3: "Author popularity",
      option4: "Publication year",
      answer: 3,
    },
  ];

  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [modId, setModId] = useState("");
  const navigate = useNavigate()
  const handleOptionSelect = (questionIndex, selectedAnswer) => {
    const correctAnswer = questions[questionIndex].answer;

    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];

      if (newAnswers[questionIndex] === null) {
        // No previous answer
        if (selectedAnswer === correctAnswer) {
          setScore((prevScore) => prevScore + 1);
        }
      } else {
        // There is a previous answer
        if (
          newAnswers[questionIndex] !== correctAnswer &&
          selectedAnswer === correctAnswer
        ) {
          setScore((prevScore) => prevScore + 1);
        } else if (
          newAnswers[questionIndex] === correctAnswer &&
          selectedAnswer !== correctAnswer
        ) {
          setScore((prevScore) => prevScore - 1);
        }
      }

      newAnswers[questionIndex] = selectedAnswer;
      return newAnswers;
    });
  };

  const handleSubmit = () => {
    // Handle form submission here

    console.log("start ", answers);

    if (!answers[0]) {
      toast.error("Please answer the first question");
      return;
    }
    if (!answers[1]) {
      toast.error("Please answer the second question");
      return;
    }
    if (!answers[2]) {
      toast.error("Please answer the third question");
      return;
    }
    if (!answers[3]) {
      toast.error("Please answer the fourth question");
      return;
    }
    if (!answers[4]) {
      toast.error("Please answer the fifth question");
      return;
    }
    if (!answers[5]) {
      toast.error("Please answer the sixth question");
      return;
    }
    if (!answers[6]) {
      toast.error("Please answer the seventh question");
      return;
    }
    if (!answers[7]) {
      toast.error("Please answer the eighth question");
      return;
    }
    if (!answers[8]) {
      toast.error("Please answer the ninth question");
      return;
    }
    if (!answers[9]) {
      toast.error("Please answer the tenth question");
      return;
    }

    sendDataToServer();

    console.log("end ", answers);
  };

  useEffect(() => {
    const id = localStorage.getItem("trade-hub-modId") || null;
    if (!id) {
      toast.error("Please login again.");
      navigate("/moderator/login");
      return;
    }
    setModId(id);
  }, []);
  const sendDataToServer = async () => {
    try {
      const res = await axiosInstance.patch(`/addTestScore/${modId}`, {score});
      console.log("res", res);
      if (res.status === 200) {
        toast.success("Test submitted successfully.");
        navigateToOverview()
      } 
    } catch (error) {

      toast.error("Try again later");
      console.log("Error on send quiz score", error);
    }
  };
  return (
    <div
      className="px-5  mt-5"
      style={{ maxHeight: "100vh", overflowY: "auto" }}
    >
      <div>
        {/* <p>Total Score: {score}</p> */}
        <h3 className="text-center">Answer all the 10 questions</h3>
        <p className="text-center"> Admin will evaluate your answers. </p>
      </div>
      {questions.map((question, index) => (
        <Accordion
          key={index}
          className="my-3"
          style={{ paddingRight: "30px", paddingLeft: "20px" }}
        >
          <Accordion.Item eventKey={String(index)}>
            <Accordion.Header>Question {index + 1}</Accordion.Header>
            <Accordion.Body>
              <p>
                {" "}
                {index + 1} &nbsp; {question.question}
              </p>
              <ol className="d-flex justify-content-around my-3">
                <li className="d-flex ">
                  {/* <Form.Check.Label className="px-2"> 1</Form.Check.Label> */}
                  <Form.Check
                    type="radio"
                    aria-label={`Option 1 for question ${index}`}
                    name={`question${index}`}
                    onChange={() => handleOptionSelect(index, 1)}
                  />
                  <p className="mx-2">{question.option1}</p>
                </li>
                <li className="d-flex">
                  {/* <Form.Check.Label className="px-2"> 2</Form.Check.Label> */}
                  <Form.Check
                    type="radio"
                    aria-label={`Option 2 for question ${index}`}
                    name={`question${index}`}
                    onChange={() => handleOptionSelect(index, 2)}
                  />
                  <p className="mx-2">{question.option2}</p>
                </li>
                <li className="d-flex">
                  {/* <Form.Check.Label className="px-2">3</Form.Check.Label> */}
                  <Form.Check
                    type="radio"
                    aria-label={`Option 3 for question ${index}`}
                    name={`question${index}`}
                    onChange={() => handleOptionSelect(index, 3)}
                  />
                  <p className="mx-2">{question.option3}</p>
                </li>
                <li className="d-flex">
                  {/* <Form.Check.Label className="px-2"> 4</Form.Check.Label> */}
                  <Form.Check
                    type="radio"
                    aria-label={`Option 4 for question ${index}`}
                    name={`question${index}`}
                    onChange={() => handleOptionSelect(index, 4)}
                  />
                  <p className="mx-2">{question.option4}</p>
                </li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}

      <div className="d-flex justify-content-center">
        <Button varaint="success" onClick={handleSubmit}>
          Submit Test
        </Button>
      </div>
    </div>
  );
}

export default ModeratorQuiz;
