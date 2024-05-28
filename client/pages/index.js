import axios from 'axios';

const Lending = ({ currentUser }) => {
  console.log('Component', currentUser);
  return <h1>Lending</h1>;
};

// Lending.getInitialProps = async () => {
//   const response = await axios.get('/api/users/currentuser');

//   return response.data;
// };

export default Lending;
