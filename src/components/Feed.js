import Post from './Post';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import useFetchApi from '../hooks/useFetchApi';

function Feed() {

  // I would store this api key in an environemnt variable in a production app
  const apiKey = "w4jMBr6Sq32xLVYLo2LWQKOVvP1wp1UMx2A1R86M"
  const count = 10

  const [items, isLoading, error] = useFetchApi(apiKey, count)

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (isLoading) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress />
      </Box >
    )
  } else {
    return <>
      {items.map((post) => <Post imageUrl={post.url} title={post.title} description={post.explanation} date={post.date} />)}
    </>
  }
}

export default Feed;
