'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { CreateUserModal } from './CreateUserModal';

export function CreateUserButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button 
        variant="default" 
        className="rounded-full shadow-md flex items-center gap-2 hover:scale-105"
        onClick={() => setIsModalOpen(true)}
      >
        <span className="material-symbols-outlined text-[20px]">person_add</span>
        Create User
      </Button>

      <CreateUserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
