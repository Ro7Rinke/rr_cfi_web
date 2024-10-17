import React, { useState } from 'react';

const AddEntry = () => {
  const [title, setTitle] = useState('');
  const [totalValue, setTotalValue] = useState('0,00');
  const [installments, setInstallments] = useState(1);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Dia atual por padrão
  const [category, setCategory] = useState('');

  const categories = ['Alimentação', 'Educação', 'Lazer', 'Saúde', 'Transporte'];

  // Função para formatar o valor como moeda brasileira com duas casas decimais
  const handleTotalValueChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    
    // Se o valor for vazio, reinicia para '0,00'
    if (!value) {
      setTotalValue('0,00');
      return;
    }

    // Remove os zeros à esquerda, se houver
    value = parseInt(value, 10).toString();

    // Formata o valor com vírgula para separar as casas decimais
    const formattedValue = (value.length === 1 
      ? '0,0' + value 
      : value.length === 2 
      ? '0,' + value 
      : value.slice(0, -2) + ',' + value.slice(-2)
    );

    setTotalValue(formattedValue);
  };

  // Função para garantir que o cursor fique à direita quando entrar no campo
  const handleFocus = (e) => {
    const length = e.target.value.length;
    e.target.setSelectionRange(length, length); // Move o cursor para o final
  };

  // Função para enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // Converte o valor para float antes de enviar
    const formattedTotalValue = parseFloat(totalValue.replace(',', '.'));

    const newEntry = {
      title,
      totalValue: formattedTotalValue,
      installments,
      date,
      category,
    };

    console.log('Nova entrada adicionada:', newEntry);
    // Aqui você pode adicionar a lógica para salvar a nova entrada no backend ou no estado global
  };

  return (
    <div>
      <h1>Adicionar Nova Entrada</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Valor Total (R$):</label>
          <input
            type="text"
            value={totalValue}
            onChange={handleTotalValueChange}
            onFocus={handleFocus} // Garante que o cursor inicie à direita
            required
            maxLength="10"
          />
        </div>

        <div>
            <label>Total de Parcelas:</label>
            <input
                type="number"
                value={installments}
                onChange={e => setInstallments(e.target.value)}
                min="1" // impede valores negativos ou zero
                pattern="[0-9]*" // restringe para números
            />
        </div>

        <div>
          <label>Data:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Categoria:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Selecione uma categoria</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Adicionar Entrada</button>
      </form>
    </div>
  );
};

export default AddEntry;