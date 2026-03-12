'use client';

import Modal from '@/components/ui/modal';
import { useAuthStore } from '@/stores/auth';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useAuth } from '@/hooks/useAuth';

export default function AuthModal() {
  const { authModal, setAuthModal } = useAuth();

  return (
    <Modal
      isOpen={authModal !== null}
      onClose={() => setAuthModal(null)}
      size="sm"
    >
      {authModal === 'login' ? (
        <LoginForm onSwitch={() => setAuthModal('signup')} />
      ) : authModal === 'signup' ? (
        <SignupForm onSwitch={() => setAuthModal('login')} />
      ) : null}
    </Modal>
  );
}
