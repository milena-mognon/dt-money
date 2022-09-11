import { MagnifyingGlass } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { memo, useContext } from 'react';
import { SearchFormContainer } from './styles';
import { TransactionsContext } from '../../../../contexts/TransactionsContext';

const searchFormSchema = zod.object({
  // validacao
  query: zod.string(),
});

type SearchFormInputs = zod.infer<typeof searchFormSchema>; // tipagem do form

function SearchFormComponent() {
  const { fetchTransactions } = useContext(TransactionsContext);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema), // resolver da validacao, recebe o schema de validacao
  });

  async function handleSearchTransactions(data: SearchFormInputs) {
    // data sao os valores dos campos dos formularios
    await fetchTransactions(data.query);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}

export const SearchForm = memo(SearchFormComponent); // nao precisaria usar o memo, vou deixar somente como exemplo

/**
 * Por que um componente renderiza?
 * - Hooks mudaram (mudou estados, contextos, reducers)
 * - Props mudaram
 * - Parent rerendered (componente pai renderizou)
 *
 * Como e o fluxo de renderizacao?
 *
 * 1. O react recria o HTML da interface daquele componente
 * 2. Compara a versao do HTML recriada com a versao anterior
 * 3. se mudou algo, reescreve o HTML na tela
 *
 * Como o memo funciona:
 *
 * 1. Verifica se Hooks ou Props mudaram (deep comparison)
 * 2. Compara a versao anterior dos hooks e props
 * 3. Se mudou algo, ele vai permitir a nova rederizacao (inicia o fluxo descrito acima)
 *
 * Muitas vezes e mais custoso usar o memo do que deixar o HTML renderizar novamente
 */
