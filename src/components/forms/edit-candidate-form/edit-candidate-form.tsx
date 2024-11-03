import { CandidateDetails } from "@/@types/candidate"
import { useCandidateDetail } from "@/app/candidate-details/hooks/use-candidate-detail"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MailIcon } from "lucide-react"
import { maskPhone } from "@/utils/mask-phone"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import { statusCandidateList } from "../create-candidate-form/helpers/list-of-status"
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js"
import { editCandidateSchema } from "./schema/edit-candidate-schema"
import { useEditCandidate } from "./hooks/use-edit-candidate"

export function EditCandidateForm() {
   const { handleEditCandidate } = useEditCandidate()
   const { data } = useCandidateDetail()

   const form = useForm<CandidateDetails>({
      values: {
         name: data?.name || '',
         email: data?.email || '',
         phone: data?.phone || '',
         status: data?.status || 'DISPONIVEL',
         skills: data?.skills.map((skill: { name: string }) => ({ name: skill.name })) || [],
         experience: data?.experience || '',
         education: data?.education || '',
      },
      resolver: zodResolver(editCandidateSchema)
   })

   // const { fields, append, remove } = useFieldArray({
   //    control: form.control,
   //    name: "skills",
   //    rules: {
   //       validate: {
   //          required: (fields) => fields.length > 0
   //       }
   //    }
   // });

   function submitNewInformation(data: CandidateDetails) {
      handleEditCandidate(data);
   }

   if (!data) {
      return <p>Carregando...</p>
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(submitNewInformation)} className="space-y-4 p-4 max-h-[800px] overflow-auto">
            <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <div className="relative">
                           <Input
                              {...field}
                              placeholder="example@mail.com"
                              className={form.formState.errors.email ? "border-red-500 pl-10" : "pl-10"}
                           />
                           <MailIcon
                              className={
                                 form.formState.errors.email
                                    ?
                                    "absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400" :
                                    "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              }
                              size={18}
                           />
                        </div>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="name"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Nome completo</FormLabel>
                     <FormControl>
                        <div>
                           <Input
                              {...field}
                              className={form.formState.errors.email ? "border-red-500" : ""}
                           />
                        </div>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="phone"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Telefone</FormLabel>
                     <FormControl>
                        <div>
                           <Input
                              {...field}
                              value={maskPhone(field.value)}
                              onChange={(e) => {
                                 const unmaskedValue = e.target.value.replace(/[()\- ]/g, "");
                                 field.onChange(unmaskedValue);
                              }}
                              className={form.formState.errors.email ? "border-red-500" : ""}
                           />
                        </div>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="education"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Formacao</FormLabel>
                     <FormControl>
                        <div>
                           <Input
                              {...field}
                              className={form.formState.errors.email ? "border-red-500" : ""}
                           />
                        </div>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="experience"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Experiência</FormLabel>
                     <FormControl>
                        <div>
                           <Input
                              {...field}
                              className={form.formState.errors.email ? "border-red-500" : ""}
                           />
                        </div>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="status"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Status</FormLabel>
                     <FormControl>
                        <Select
                           onValueChange={field.onChange}
                           defaultValue={field.value}
                        >
                           <SelectTrigger className={form.formState.errors.status ? "border-red-500 w-full" : "w-full"}>
                              <SelectValue placeholder="Selecione um campo" />
                           </SelectTrigger>
                           <SelectContent ref={field.ref}>
                              {statusCandidateList.map((status, _index) => (
                                 <SelectItem
                                    value={status}
                                    key={_index}
                                 >
                                    {status}
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            {/* <FormField
               control={form.control}
               name="skills"
               render={() => (
                  <FormItem>
                     <FormLabel>Habilidades</FormLabel>
                     <FormControl>
                        <div>
                           {fields.map((item, index) => (
                              <div key={item.id} className="flex items-center space-x-2">
                                 <Input
                                    {...form.register(`skills.${index}.name`)}
                                    placeholder="Nome da habilidade"
                                    className={form.formState.errors.skills?.[index]?.name ? "border-red-500 mt-5" : ""}
                                 />
                                 <Button
                                    variant="ghost"
                                    className="mt-5"
                                    type="button"
                                    onClick={() => remove(index)}>
                                    <Trash2 />
                                 </Button>
                              </div>
                           ))}
                           <Button
                              type="button"
                              variant="secondary"
                              className="w-full"
                              onClick={() => append({ name: "" })} // Adiciona uma nova habilidade
                           >
                              <Plus />
                           </Button>
                        </div>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            /> */}

            <Button type="submit" className="w-full">
               Cadastrar candidato
            </Button>
         </form>
      </Form>
   )

}