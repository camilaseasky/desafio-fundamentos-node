import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    this.balance.income = this.transactions.reduce(
      (acumulador, transaction) => {
        return transaction.type === 'income'
          ? acumulador + transaction.value
          : acumulador;
      },
      0,
    );

    this.balance.outcome = this.transactions.reduce(
      (acumulador, transaction) => {
        return transaction.type === 'outcome'
          ? acumulador + transaction.value
          : acumulador;
      },
      0,
    );

    this.balance.total = this.balance.income - this.balance.outcome;

    return this.balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
