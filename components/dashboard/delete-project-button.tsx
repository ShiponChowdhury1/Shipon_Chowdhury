'use client';

import { useState, useTransition } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalBody, ModalFooter } from '@/components/ui/modal';
import { deleteProject } from '@/server/actions/project.actions';
import { showToast } from '@/lib/toast';
import { useRouter } from 'next/navigation';

export function DeleteProjectButton({ projectId }: { projectId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteProject(projectId);
      setIsOpen(false);

      if (result.success) {
        showToast.success('Project deleted successfully!');
        router.refresh();
      } else {
        showToast.error(result.error || 'Failed to delete project');
      }
    });
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="px-2 sm:px-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30"
      >
        <Trash2 size={14} />
      </Button>

      <Modal open={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Delete Project</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p className="text-gray-600 dark:text-gray-400">
              Are you sure you want to delete this project? This action cannot be undone.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
