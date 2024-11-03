import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/useModal"
import { CreateCandidateForm } from '../../forms/create-candidate-form/create-candidate-form';


export function CreateCandidateModal() {
   const { onClose, isOpen } = useModal()
   return (
      <Dialog onOpenChange={onClose} open={isOpen}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Cadastre um candidato</DialogTitle>
               <CreateCandidateForm />
            </DialogHeader>
         </DialogContent>
      </Dialog>

   )
}