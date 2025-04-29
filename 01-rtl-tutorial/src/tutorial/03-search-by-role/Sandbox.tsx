import { useEffect, useState } from "react";


const Sandbox = () => {
  const [showAsyncButton, setShowAsyncButton] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    //Show async button after 500ms
    const timer = setTimeout(() => {
      setShowAsyncButton(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
   <div>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
      </nav>

      {/* Headings */}
      <h1>Main Heading</h1>
      <h2>Subheading</h2>
      <img src="example.jpg" alt="Example" />
      {/*Regular buttons */}
      <button>Click me</button>
      <button>Submit</button>
      <button>Cansel</button>
      {/* Conditional error button to demonstrate queryByRole */}
      {showError && <button>Error</button>}
      {/* Async button to demonstrate findByRole */}
      {showAsyncButton && <button>Async Button</button>}
  </div>
  )
};
export default Sandbox;
