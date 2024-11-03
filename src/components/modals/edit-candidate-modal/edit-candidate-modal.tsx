import { EditCandidateForm } from "@/components/forms/edit-candidate-form/edit-candidate-form"
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/useModal"


export function EditCandidateModal() {
   const { onClose, isOpen } = useModal()
   return (
      <Dialog onOpenChange={onClose} open={isOpen}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Editar candidato</DialogTitle>
               <EditCandidateForm />
            </DialogHeader>
         </DialogContent>
      </Dialog>

   )
}