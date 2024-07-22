// import React from "react";
// import Accordion from "react-bootstrap/Accordion";
// import Form from "react-bootstrap/Form";

// function ModeratorQuiz() {
//   const question = [
//     {
//       question:
//         "What criteria should a moderator consider first when assigning points to a product?",
//       option1: "Product category",
//       option2: "Product condition",
//       option3: "Product quantity",
//       option4: "User's address",
//       answer: 2,
//     },
//     {
//       question:
//         "A user uploads a product with minor scratches. How should this affect the points assigned?",
//       option1: "No points should be given",
//       option2: "Slight reduction in points",
//       option3: "Maximum points should be assigned",
//       option4: "Moderate reduction in points",
//       answer: 2,
//     },

//     {
//       question: "Which product condition should receive the highest points?",
//       option1: "Minor scratches",
//       option2: "No Damage",
//       option3: "Flawless",
//       option4: "All conditions receive the same points",
//       answer: 3,
//     },

//     {
//       question:
//         "When a product is listed in the 'electronics' category, what specific details should the moderator verify?",
//       option1: "Product condition and brand",
//       option2: "User's address and pincode",
//       option3: "User's phone number",
//       option4: "Number of quantities only",
//       answer: 1,
//     },
//     {
//       question:
//         "If a user’s product listing lacks a clear image, what action should the moderator take?",
//       option1: "Reject the listing",
//       option2: "Assign fewer points",
//       option3: "Ask the user to upload a better image",
//       option4: "Ignore the image quality",
//       answer: 1,
//     },
//     {
//       question:
//         "Which category is NOT one of the five given categories in the Trade Hub?",
//       option1: "Books",
//       option2: "Electronics",
//       option3: "Toys",
//       option4: "Clothing",
//       answer: 3,
//     },
//     {
//       question:
//         "How should a moderator handle a listing with incorrect user contact details?",
//       option1: "Ignore the listing",
//       option2: "Assign points as usual",
//       option3: "Contact the user for correct details",
//       option4: "Delete the listing",
//       answer: 3,
//     },
//     {
//       question:
//         "What is the first step a moderator should take when a new product request is received?",
//       option1: "Check product condition",
//       option2: "Verify user’s address and pincode",
//       option3: "Review the product category",
//       option4: "Check user’s phone number",
//       answer: 1,
//     },

//     {
//       question:
//         "What should a moderator do if the product description is vague?",
//       option1: "Assign low points",
//       option2: "Reject the listing",
//       option3: "Request a more detailed description",
//       option4: "Assign points based on available details",
//       answer: 3,
//     },
//     {
//       question:
//         "How should a moderator handle duplicate listings from the same user?",
//       option1: "Approve all listings",
//       option2: "Approve the first listing only",
//       option3: "Reject all duplicate listings",
//       option4: "Merge listings and assign points collectively",
//       answer: 3,
//     },
//     {
//       question:
//         "A product in flawless condition should receive how many points compared to one with minor scratches?",
//       option1: "Same points",
//       option2: "Slightly more points",
//       option3: "Significantly more points",
//       option4: "Fewer points",
//       answer: 3,
//     },
//     {
//       question:
//         "Which factor is least important when assigning points to a book?",
//       option1: "Book condition",
//       option2: "Book category",
//       option3: "Author popularity",
//       option4: "Publication year",
//       answer: 3,
//     },
//     {
//       question:
//         "What should be the moderator's response to a product listed under an incorrect category?",
//       option1: "Ignore and proceed",
//       option2: "Assign points anyway",
//       option3: "Move it to the correct category",
//       option4: "Contact the user for clarification",
//       answer: 3,
//     },
//     {
//       question:
//         "When evaluating electronics, what additional information should the moderator seek?",
//       option1: "Warranty details",
//       option2: "User's previous listings",
//       option3: "User's feedback rating",
//       option4: "User's address",
//       answer: 1,
//     },
//     {
//       question:
//         "If a product image is unclear, what should the moderator prioritize?",
//       option1: "Product condition description",
//       option2: "Product category",
//       option3: "Product quantity",
//       option4: "User's phone number",
//       answer: 1,
//     },
//     {
//       question:
//         "A user lists a damaged product with no clear image. How should this be handled?",
//       option1: "Reject the listing",
//       option2: "Assign low points",
//       option3: "Request a better image and condition details",
//       option4: "Approve but mark as low quality",
//       answer: 3,
//     },

//     {
//       question:
//         "What is a moderator's role when a product is listed as 'No Damage' but shows wear and tear in the image?",
//       option1: "Approve as listed",
//       option2: "Assign fewer points",
//       option3: "Reject the listing",
//       option4: "Request a correct condition update",
//       answer: 4,
//     },
//   ];


//   return (
//     <div>
//       {question.map((e, index) => {
//         return (
//           <Accordion>
//             <Accordion.Item eventKey="1">
//               <Accordion.Header>question {index + 1}</Accordion.Header>
//               <Accordion.Body>
//                 {e.question}
//                 <ol className="d-flex justify-content-around my-3">
//                   <li className="d-flex">
//                     <Form.Check.Label className="px-2">
//                       Option 1
//                     </Form.Check.Label>
//                     <Form.Check
//                       type="radio"
//                       aria-label="radio"
//                       name="option"
                      
                     
//                     />
//                     <p className="mx-2">{e.option1}</p>
//                   </li>
//                   <li className="d-flex">
//                     <Form.Check.Label className="px-2">
//                       Option 2
//                     </Form.Check.Label>
//                     <Form.Check
//                       type="radio"
//                       aria-label="radio 2"
//                       name="option"
                    
//                     />
//                     <p className="mx-2">{e.option2}</p>
//                   </li>
//                   <li className="d-flex">
//                     <Form.Check.Label className="px-2">
//                       Option 3
//                     </Form.Check.Label>
//                     <Form.Check
//                       type="radio"
//                       aria-label="radio 3"
//                       name="option"
                     
//                     />
//                     <p className="mx-2">{e.option3}</p>
//                   </li>
//                   <li className="d-flex">
//                     <Form.Check.Label className="px-2">
//                       Option 4
//                     </Form.Check.Label>
//                     <Form.Check
//                       type="radio"
//                       aria-label="radio 4"
//                       name="option"
                      
//                     />
//                     <p className="mx-2">{e.option4}</p>
//                   </li>
//                 </ol>
//               </Accordion.Body>
//             </Accordion.Item>
//           </Accordion>
//         );
//       })}
//     </div>
//   );
// }

// export default ModeratorQuiz;

import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";

function ModeratorQuiz() {
    const questions =        
      [
        {
            "question": "What criteria should a moderator consider first when assigning points to a product?",
            "option1": "Product category",
            "option2": "Product condition",
            "option3": "Product quantity",
            "option4": "User's address",
            "answer": 2
        },
        {
            "question": "A user uploads a product with minor scratches. How should this affect the points assigned?",
            "option1": "No points should be given",
            "option2": "Slight reduction in points",
            "option3": "Maximum points should be assigned",
            "option4": "Moderate reduction in points",
            "answer": 2
        },
    
        {
            "question": "Which product condition should receive the highest points?",
            "option1": "Minor scratches",
            "option2": "No Damage",
            "option3": "Flawless",
            "option4": "All conditions receive the same points",
            "answer": 3
        },
      
        {
            "question": "When a product is listed in the 'electronics' category, what specific details should the moderator verify?",
            "option1": "Product condition and brand",
            "option2": "User's address and pincode",
            "option3": "User's phone number",
            "option4": "Number of quantities only",
            "answer": 1
        },
        {
            "question": "If a user’s product listing lacks a clear image, what action should the moderator take?",
            "option1": "Reject the listing",
            "option2": "Assign fewer points",
            "option3": "Ask the user to upload a better image",
            "option4": "Ignore the image quality",
            "answer": 1
        },
        {
            "question": "Which category is NOT one of the five given categories in the Trade Hub?",
            "option1": "Books",
            "option2": "Electronics",
            "option3": "Toys",
            "option4": "Clothing",
            "answer": 3
        },
     
        {
            "question": "What is the first step a moderator should take when a new product request is received?",
            "option1": "Check product condition",
            "option2": "Verify user’s address and pincode",
            "option3": "Review the product category",
            "option4": "Check user’s phone number",
            "answer": 1
        },
     {
            "question": "How should a moderator handle duplicate listings from the same user?",
            "option1": "Approve all listings",
            "option2": "Approve the first listing only",
            "option3": "Reject all duplicate listings",
            "option4": "Merge listings and assign points collectively",
            "answer": 3
        },
        {
            "question": "A product in flawless condition should receive how many points compared to one with minor scratches?",
            "option1": "Same points",
            "option2": "Slightly more points",
            "option3": "Significantly more points",
            "option4": "Fewer points",
            "answer": 3
        },
        {
            "question": "Which factor is least important when assigning points to a book?",
            "option1": "Book condition",
            "option2": "Book category",
            "option3": "Author popularity",
            "option4": "Publication year",
            "answer": 3
        },
    
    ]


  const [score, setScore] = useState(0);

  const handleOptionSelect = (questionIndex, selectedAnswer) => {
    const correctAnswer = questions[questionIndex].answer;
    if (selectedAnswer === correctAnswer) {
      setScore(score + 1); // Increment score if answer is correct
    }
  };

  return (
    <div>
      {questions.map((question, index) => (
        <Accordion key={index}>
          <Accordion.Item eventKey={String(index)}>
            <Accordion.Header>Question {index + 1}</Accordion.Header>
            <Accordion.Body>
              <p>{question.question}</p>
              <ol className="d-flex justify-content-around my-3">
                <li className="d-flex">
                  <Form.Check.Label className="px-2"> 1</Form.Check.Label>
                  <Form.Check
                    type="radio"
                    aria-label={`Option 1 for question ${index}`}
                    name={`question${index}`}
                    onChange={() => handleOptionSelect(index, 1)}
                  />
                  <p className="mx-2">{question.option1}</p>
                </li>
                <li className="d-flex">
                  <Form.Check.Label className="px-2"> 2</Form.Check.Label>
                  <Form.Check
                    type="radio"
                    aria-label={`Option 2 for question ${index}`}
                    name={`question${index}`}
                    onChange={() => handleOptionSelect(index, 2)}
                  />
                  <p className="mx-2">{question.option2}</p>
                </li>
                <li className="d-flex">
                  <Form.Check.Label className="px-2">3</Form.Check.Label>
                  <Form.Check
                    type="radio"
                    aria-label={`Option 3 for question ${index}`}
                    name={`question${index}`}
                    onChange={() => handleOptionSelect(index, 3)}
                  />
                  <p className="mx-2">{question.option3}</p>
                </li>
                <li className="d-flex">
                  <Form.Check.Label className="px-2"> 4</Form.Check.Label>
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
      <div>
        <p>Total Score: {score}</p>
      </div>
    </div>
  );
}

export default ModeratorQuiz;

