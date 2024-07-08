import "./adminGuideline.css";
import Form from 'react-bootstrap/Form';


export const AdminGuideline = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="adminGuieline-body">
        <h1>Guidelines</h1>
      <Form>
      <Form.Group className="mb-3 d-flex" controlId="exampleForm.ControlInput1">
        <Form.Label className="adminGuideline-title ">Title</Form.Label>
        <Form.Control type="email" placeholder="Title" className="adminGuideline-input"/>
      </Form.Group>
      <Form.Group className=" mb-3 d-flex " controlId="exampleForm.ControlTextarea1">
        <Form.Label className="adminGuideline-label1">Content</Form.Label>
        <Form.Control as="textarea" rows={7} className="adminGuideline-textArea1"/>
      </Form.Group>
      <Form.Group className="mb-3 d-flex " controlId="exampleForm.ControlTextarea1">
        <Form.Label className="adminGuideline-label2">Conclusion</Form.Label>
        <Form.Control as="textarea" rows={7} className=" adminGuideline-textArea2" />
      </Form.Group>
<button  className="adminGuideline-submit">Submit</button>    
</Form>
      </div>
    </div>
  );
};
