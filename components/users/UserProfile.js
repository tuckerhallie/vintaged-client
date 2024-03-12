/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from '../../utils/context/authContext';

export default function UserProfile() {
  const { user } = useAuth();

  return (
    <div>
      <h1>{user.first_name}</h1>
      <h1>{user.last_name}</h1>
      <h2>{user.bio}</h2>
    </div>
  );
}
