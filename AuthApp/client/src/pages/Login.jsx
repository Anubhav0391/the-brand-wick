import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Stack,
  useToast,
  Link,
  Text,
  Center,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
let initialValue = {
  email: "",
  password: "",
};

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || { data: "/" };
  const toast = useToast();
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state);

  const [formValues, setFormValues] = useState(initialValue);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormValues(initialValue);
    try {
      let users = axios
        .get("https://big-basket-api.onrender.com/Users")
        .then((response) => {
          console.log(response);
          let login = response.data.find((item) => {
            return (
              item.email === formValues.email &&
              item.password === formValues.password
            );
          });
          if (login) {
            // dispatch(SetUserDataAfterLogin(login));
            toast({
              position: "top",
              title: "Welcome to ApnaBasket.",
              description: "Successfully Logged in...",
              status: "success",
              duration: 1000,
              isClosable: true,
            });
            navigate(location.state || "/", { replace: true });
          } else {
            toast({
              position: "top",
              title: "Invalid Credential.",
              description: "",
              status: "error",
              duration: 4000,
              isClosable: true,
            });
          }
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Box mx="auto" w={{ base: "80%", md: "50%" }} my={"130px"}>
      <Heading as="h1" textAlign="center" my="8">
        Log In
      </Heading>
      {isError && (
        <Box textAlign="center" mb="4">
          <p>Error logging in. Please try again later.</p>
        </Box>
      )}
      <form onSubmit={handleSubmit}>
        <Stack spacing="4">
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
            backgroundColor={"#84c225"}
            color={"white"}
            isLoading={isLoading}
            loadingText="Logging in..."
          >
            Log In
          </Button>
          <br />
          <Center>
          <Text>Do'nt have an account ? &nbsp;</Text>
          <Link
            color={'#84c225'}
            textDecoration={'none'}
            href="/signup"
            textAlign="center"
            cursor={'pointer'}
          >
            Sign Up
          </Link></Center>
        </Stack>
      </form>
    </Box>
  );
};