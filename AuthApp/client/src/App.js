import { Center, HStack } from "@chakra-ui/react";
import "./App.css";
import AllRoutes from "./components/AllRoutes";
import { Link } from "react-router-dom";

function App() {
  return <div className="App">
    <Center mt={5} color={'#F2B211'}
            textDecoration={'none'}
            href="/"
            textAlign="center"
            cursor={'pointer'}><Link to='/verify' >Go to authenticated page</Link></Center>
    <AllRoutes/>
  </div>;
}

export default App;
