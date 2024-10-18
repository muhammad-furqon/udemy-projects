import { useRef } from "react";
import Button from "./components/Button";
import Container from "./components/Container";
import Input from "./components/Input";
import Form, { FormHandle } from "./components/Form";

function App() {
  const customForm = useRef<FormHandle>(null);

  function handleSave(data:unknown) {
    // const extractedData = data as {name:string; age:string};
    if(!data || typeof data !== 'object' || !('name' in data) || !('age' in data)){
      return
    }
    console.log(data);
    customForm.current?.clear();
  }
  // const input = useRef<HTMLInputElement>(null);

  return( 
  <main>
    {/* <Container as={Button}>Click me</Container> */}
    <Form onSave={handleSave} ref={customForm}>
      <Input type="text" label="Name" id="name" />
      <Input type="number" label="Age" id="age" />
      <p>
        <Button>Save</Button>
      </p>
    </Form>
  </main>
  );
}

export default App;
