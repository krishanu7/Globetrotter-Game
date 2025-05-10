import { useState, useNavigate } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useApi from '../hooks/useApi';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const api = useApi();
  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.signup({ username, email, password });
      navigator('/login')
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                className={'mt-1'}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
             <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                className={'mt-1'}
                type={'email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                className={'mt-1'}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
          <p className="mt-4 text-center">
            Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;