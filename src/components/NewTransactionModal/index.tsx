import * as Dialog from '@radix-ui/react-dialog';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller } from 'react-hook-form';

const newTransactionFormSchema = zod.object({
  // validacao
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(['income', 'outcome']),
});

type NewTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>; // tipagem do form

export function NewTransactionModal() {
  const {
    control, // se a informacao NAO vem de um elemento nativo do html precisa usar o control
    register, // se a informacao vem de um elemento nativo do html precisa usar register
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema), // resolver da validacao, recebe o schema de validacao
    defaultValues: {
      type: 'income',
    },
  });

  function handleNewTransactionTransactions(data: NewTransactionFormInputs) {
    // data sao os valores dos campos dos formularios
    console.log(data);
  }
  return (
    <Dialog.Portal>
      <Overlay>
        <Content>
          <Dialog.Title>Nova Transação</Dialog.Title>

          <CloseButton>
            <X size={24} />
          </CloseButton>

          <form onSubmit={handleSubmit(handleNewTransactionTransactions)}>
            <input
              type="text"
              required
              placeholder="Descrição"
              {...register('description')}
            />
            <input
              type="number"
              required
              placeholder="Preço"
              {...register('price', { valueAsNumber: true })} // converte o valor de string para number
            />
            <input
              type="text"
              required
              placeholder="Categoria"
              {...register('category')}
            />

            <Controller
              control={control}
              name="type"
              render={({ field }) => {
                console.log(field);

                return (
                  <TransactionType
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <TransactionTypeButton variant="income" value="income">
                      <ArrowCircleUp size={24} /> Entrada
                    </TransactionTypeButton>

                    <TransactionTypeButton variant="outcome" value="outcome">
                      <ArrowCircleDown size={24} /> Saída
                    </TransactionTypeButton>
                  </TransactionType>
                );
              }}
            />
            <button type="submit" disabled={isSubmitting}>
              Cadastrar
            </button>
          </form>
        </Content>
      </Overlay>
    </Dialog.Portal>
  );
}
