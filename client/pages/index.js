import buildClient from '../api/build-client';
const Lending = ({ currentUser }) => {
  return currentUser ? <h1>Signed in</h1> : <h1>Not Signed in</h1>;
};

Lending.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  return data;
};

export default Lending;
