import { useState } from 'react';
import Router from 'next/router';

import useRequest from '../../hooks/use-request';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: { email, password },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <form onSubmit={onSubmit} className="d-flex flex-column">
      <h1>Sign In</h1>
      <div className="form-group my-1">
        <label>Email Address</label>
        <input
          value={email}
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group my-1">
        <label>Password</label>
        <input
          value={password}
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </div>
      {errors}
      <button className="btn btn-primary">Sign In</button>
    </form>
  );
};

export default Signup;
