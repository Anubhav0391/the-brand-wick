import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, isValidMotionProp } from "framer-motion";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Center,
  Input,
  chakra,
  shouldForwardProp,
  Stack,
  Link,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { register } from "../redux/auth/auth.action";

let initialValue = {
  name: "",
  username: "",
  email: "",
  phone: "",
  password: "",
};

const Animate = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const SignUp = () => {
    
  const [isExpanded, setExpanded] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state);
  const toast = useToast();
  const navigate = useNavigate();
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
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormValues(initialValue);

    dispatch(register(formValues))
      .then((res) => {
        toast({
          position: "top",
          title: res.msg,
          status: "success",
          duration: 1500,
          isClosable: true,
        });
        if (res.msg === "Registered Successfully") {
          navigate("/login");
        }
      })
      .catch(() => {
        toast({
          position: "top",
          title: "Error signing up. Please try again later.",
          status: "error",
          duration: 1500,
          isClosable: true,
        });
      });
  };

  return (
    <Box
      mx="auto"
      w={{ base: "80%", md: "40%" }}
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
          <Text fontSize={"50px"} fontWeight={600}>
            Create
          </Text>
          <Text fontSize={"50px"} fontWeight={600}>
            Account
          </Text>
          <Text fontSize={"20px"} fontWeight={500}>
            Please sign-up to continue!
          </Text>
        </Box>
      </Box>
      {isError && (
        <Box textAlign="center" mb="4">
          <p>Error signing up. Please try again later.</p>
        </Box>
      )}
      <form onSubmit={handleSubmit}>
        <Stack spacing="4" p={10} opacity={show&&0}>
          <FormControl isRequired>
            <FormLabel htmlFor="name">Name:</FormLabel>
            <Input
              focusBorderColor="#F2B211"
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
              focusBorderColor="#F2B211"
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
            <FormLabel htmlFor="phone">Contact No:</FormLabel>
            <Input
              focusBorderColor="#F2B211"
              type="number"
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
            isLoading={isLoading}
            backgroundColor={"#F2B211"}
            color={"white"}
            borderRadius={"40px"}
          >
            Sign Up
          </Button>
          <Center>
            <Text>Already have an account ? &nbsp;</Text>
            <Link
              color={"#F2B211"}
              textDecoration={"none"}
              href="/login"
              textAlign="center"
              cursor={"pointer"}
            >
              Login
            </Link>
          </Center>
        </Stack>
      </form>
    </Box>
  );
};

export default SignUp;
