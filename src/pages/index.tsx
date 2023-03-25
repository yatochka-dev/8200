import { Button, Paper } from "@mui/material";
import { type NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
      <Button>Hello</Button>
      <Paper
        sx={{
          width: 200,
          height: 200,
        }}
      ></Paper>
    </div>
  );
};

export default Home;
