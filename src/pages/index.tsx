import { type NextPage } from 'next';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { calc } from '@/utils';
import { type FC, type MouseEvent, useCallback } from 'react';
import { useRouter } from 'next/router';

export const HomeCard: FC<{
  title: string;
  description: string;
  image: string;
  linkTo: string;
}> = ({ image, title, description, linkTo }) => {
  const router = useRouter();

  const handleClick = useCallback(
    (_event: MouseEvent<HTMLButtonElement>) => {
      router.push(linkTo).catch((err) => console.error(err));
    },
    [linkTo, router]
  );

  return (
    <Grid item>
      <Card
        sx={{
          maxWidth: 300,
        }}
        variant={'outlined'}
      >
        <CardActionArea onClick={handleClick}>
          <CardMedia image={image} sx={{ height: 200 }} title={title} />
          <CardContent>
            <Typography gutterBottom variant={'h5'} component={'div'}>
              {title}
            </Typography>
            <Typography variant={'body2'} color={'text.secondary'}>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

const Home: NextPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: calc('100vh - 80px'),
      }}
    >
      <Typography variant={'h1'}>Yatochka&apos;s 8200 project!</Typography>
      <Grid
        container
        spacing={3}
        sx={{
          // center items
          justifyContent: 'center',
          mt: 2,
        }}
      >
        <HomeCard
          title={'Pic Share!'}
          description={
            '          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam culpa deleniti dolor doloremque exercitationem harum itaque laborum libero numquam tempore. Blanditiis dolore exercitationem libero mollitia repellendus saepe similique tempora ut.\n'
          }
          image={'/picshare.png'}
          linkTo={'/picshare'}
        />
        <HomeCard
          title={'Pic Share!'}
          description={
            '          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam culpa deleniti dolor doloremque exercitationem harum itaque laborum libero numquam tempore. Blanditiis dolore exercitationem libero mollitia repellendus saepe similique tempora ut.\n'
          }
          image={'/picshare.png'}
          linkTo={'/picshare'}
        />
        <HomeCard
          title={'Pic Share!'}
          description={
            '          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam culpa deleniti dolor doloremque exercitationem harum itaque laborum libero numquam tempore. Blanditiis dolore exercitationem libero mollitia repellendus saepe similique tempora ut.\n'
          }
          image={'/picshare.png'}
          linkTo={'/picshare'}
        />
      </Grid>
    </Box>
  );
};

export default Home;
