import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Center,
  Input,
  Stack,
  Link,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { register } from "../redux/auth/auth.action";

let initialValue = {
  name: "",
  username:"",
  email: "",
  phone:"",
  password: ""
};

const SignUp = () => {
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state);
  const toast = useToast();
  const navigate=useNavigate();
  const [formValues, setFormValues] = useState(initialValue);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setFormValues(initialValue);
    
    dispatch(register(formValues))
    .then(res=>console.log(res))
    // try {
    //   await axios.post("https://big-basket-api.onrender.com/Users", {
    //     name: formValues.name,
    //     email: formValues.email,
    //     password: formValues.password,
    //   });
    //   toast({
    //     position: "top",
    //     title: "Sign up successful!",
    //     status: "success",
    //     duration: 1000,
    //     isClosable: true,
    //   });
    //   navigate('/login');
    // } catch (err) {
    //   console.log(err);
    //   toast({
    //     position: "top",
    //     title: "Error signing up. Please try again later.",
    //     status: "error",
    //     duration: 3000,
    //     isClosable: true,
    //   });
    // }
  };

  return (
    <Box mx="auto" w={{ base: "80%", md: "40%" }}my={"70px"}>
      <Heading as="h1" textAlign="center" my="8">
        Sign Up
      </Heading>
      {isError && (
        <Box textAlign="center" mb="4">
          <p>Error signing up. Please try again later.</p>
        </Box>
      )}
      <form onSubmit={handleSubmit}>
        <Stack spacing="4">
          <FormControl isRequired>
            <FormLabel htmlFor="name">Name:</FormLabel>
            <Input
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="username">User Name:</FormLabel>
            <Input
              type="text"
              id="username"
              name="username"
              value={formValues.username}
              onChange={handleChange}
              placeholder="Enter your user name"
            />
          </FormControl>
          
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email:</FormLabel>
            <Input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="phone">Contact No:</FormLabel>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formValues.phone}
              onChange={handleChange}
              placeholder="Enter your contact no."
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password">Password:</FormLabel>
            <Input
              type="password"
              id="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </FormControl>
          <Button
            type="submit"
            isLoading={isLoading}
            backgroundColor={"#84c225"}
            color={"white"}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </Button>
          <Center>
            <Text>Already have an account ? &nbsp;</Text>
          <Link color={'#84c225'}
            textDecoration={'none'}
            href="/login"
            textAlign="center"
            cursor={'pointer'}>Login</Link>
          </Center>
        </Stack>
      </form>
    </Box>
  );
};

export default SignUp;