import { gql, useQuery, useSubscription } from '@apollo/client';
import './App.css';

const GET_LOCATIONS = gql`
  query getWishes {
    getWishes {
      ambition
      isFulfilled
    }
  }
`;

// https://www.apollographql.com/docs/react/data/subscriptions
const COMMENTS_SUBSCRIPTION = gql`
  subscription wishAdded {
    wishAdded {
      newWish {
        ambition
        isFulfilled
      }
      dateAdded
    }
  }
`;

const ListeningComponent = () => {
  const { data, loading } = useSubscription(COMMENTS_SUBSCRIPTION);

  return (
    <>
      <b>New Message: {data?.wishAdded?.newWish?.ambition} - {data?.wishAdded?.dateAdded}</b>
    </>
  )
}

function App() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;


  return <>
    <ListeningComponent />
    {
      data.getWishes.map((item, key) => {
        return (
          <p key={key}>{item.ambition}: {item.isFulfilled ? 'True' : 'False'}</p>
        )
      })}
  </>
}

export default App;
