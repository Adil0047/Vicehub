import { useContext } from 'react';
import { AuthContext } from '@context/AuthContext';

/**
 * Convenience hook for accessing auth state and actions.
 * Throws clearly if used outside AuthProvider, so misuse fails fast
 * during development rather than producing a confusing undefined error.
 */
function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export default useAuth;
