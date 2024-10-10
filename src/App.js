import { gql, useQuery, useSubscription } from '@apollo/client';
import './App.css';
// import SubscriptionComponent from './subscription.js';
import UploadFile from './upload-file';

function App() {
  return <>
    {/* <SubscriptionComponent />  */}
      Test <br />
    <UploadFile />
  </>
}

export default App;
