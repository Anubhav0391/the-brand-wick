import React, { useEffect, useState } from "react";
import { motion, isValidMotionProp } from "framer-motion";
import {
  Box,
  Heading,
  Input,
  Button,
  FormControl,
  chakra,
  shouldForwardProp,
  FormLabel,
  Stack,
  useToast,
  Link,
  Text,
  Center,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../redux/auth/auth.action";

let initialValue = {
  email: "",
  password: "",
};

const Animate = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

export const Login = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state);

  const [formValues, setFormValues] = useState(initialValue);

  const expandingTransition = {
    type: "spring",
    duration: 2.3,
    stiffness: 30,
  };

  const backdropVariants = {
    expanded: {
      width: "233%",
      height: "1800px",
      borderRadius: "20%",
      transform: "rotate(160deg)",
    },
    collapsed: {
      width: "160%",
      height: "500px",
      borderRadius: "50%",
      transform: "rotate(160deg)",
    },
  };

  useEffect(() => {
    setExpanded(true);
    setShow(true)
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
    setTimeout(() => {
        setShow(false);
    }, 1.3*expandingTransition.duration * 1000 - 1500);
  }, []);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setFormValues(initialValue);

    dispatch(login(formValues))
      .then((res) => {
        toast({
          position: "top",
          title: res.msg,
          status: "success",
          duration: 1500,
          isClosable: true,
        });

        if (res.msg === "Login Successfull") {
          navigate(location.state || "/", { replace: true });
        }
      })
      .catch(() => {
        toast({
          position: "top",
          title: "Error logging up. Please try again.",
          status: "error",
          duration: 1500,
          isClosable: true,
        });
      });
  };

  return (
    <Box
      mx="auto"
      w={{ base: "90%", md: "60%" ,lg:"40%"}}
      my={"20px"}
      display="flex"
      flexDirection="column"
      borderRadius="19px"
      backgroundColor="#fff"
      boxShadow="0 0 2px rgba(15, 15, 15, 0.28)"
      position="relative"
      overflow="hidden"
    >
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        padding="0 1.8em"
        paddingBottom="5em"
      >
        <Animate
          position="absolute"
          width="160%"
          height="550px"
          display="flex"
          flexDirection="column"
          borderRadius="50%"
          top="-290px"
          left="-70px"
          background="linear-gradient(
  58deg,
  rgba(243, 172, 18, 1) 20%,
  rgba(241, 196, 15, 1) 100%
)"
          initial={false}
          animate={isExpanded ? "expanded" : "collapsed"}
          variants={backdropVariants}
          transition={expandingTransition}
        />
        <Box zIndex={10} color={"white"}>
          <Text fontSize={{base:'45px',md:"50px"}} fontWeight={600}>
            Welcome
          </Text>
          <Text fontSize={{base:'45px',md:"50px"}} fontWeight={600}>
            Back
          </Text>
          <Text fontSize={{base:'18px',md:"20px"}} fontWeight={500}>
            Please sign-in to continue!
          </Text>
        </Box>
      </Box>
      {isError && (
        <Box textAlign="center" mb="4">
          <p>Error logging in. Please try again later.</p>
        </Box>
      )}
      {
        <form onSubmit={handleSubmit}>
          <Stack spacing="4" p={10} opacity={show&&0}>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email:</FormLabel>
              <Input
                focusBorderColor="#F2B211"
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
                focusBorderColor="#F2B211"
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
              backgroundColor={"#F2B211"}
              color={"white"}
              borderRadius={"40px"}
              isLoading={isLoading}
            >
              Log In
            </Button>
            <br />
            <Center>
              <Text>Do'nt have an account ? &nbsp;</Text>
              <Link
                color={"#F2B211"}
                textDecoration={"none"}
                href="/"
                textAlign="center"
                cursor={"pointer"}
              >
                Sign Up
              </Link>
            </Center>
          </Stack>
        </form>
      }
    </Box>
  );
};
