import { Schema, model } from 'mongoose';

// Інтерфейси TypeScript для учасників та витрат
interface IParticipants {
  id: string;
  name: string;
}

interface IExpenseDetails {
  participantId: string;
  amount: number;
}

interface IExpenses {
  id: string;
  name: string;
  total: number;
  whoPaid: IExpenseDetails[];
  whoShouldPay: IExpenseDetails[];
}

// Інтерфейс для події
interface IEvent {
  nameEvent: string;
  timeCreated: string;
  participants: IParticipants[];
  expenses: IExpenses[];
}

// Опис схеми для учасників
const participantsSchema = new Schema<IParticipants>({
  id: {
    type: String,
    default: crypto.randomUUID(), // Генерація UUID для кожного учасника
  },
  name: {
    type: String,
    required: true, // Ім'я учасника обов'язкове
  },
});

// Опис структури для деталей витрат (хто заплатив/має заплатити)
const expenseDetailsSchema = new Schema<IExpenseDetails>({
  participantId: {
    type: String, // ID учасника
    required: true,
  },
  amount: {
    type: Number, // Сума, яку учасник заплатив або має заплатити
    required: true,
  },
});

// Опис схеми для витрат
const expensesSchema = new Schema<IExpenses>({
  id: {
    type: String,
    default: crypto.randomUUID(), // Генерація UUID для кожної витрати
  },
  name: {
    type: String,
    required: true, // Назва витрати
  },
  total: {
    type: Number,
    required: true, // Загальна сума витрати
  },
  whoPaid: {
    type: [expenseDetailsSchema], // Масив учасників, які заплатили
    default: [], // Може бути порожнім, якщо ще ніхто не заплатив
  },
  whoShouldPay: {
    type: [expenseDetailsSchema], // Масив учасників, які повинні заплатити
    required: true, // Це поле обов'язкове
  },
});

// Опис головної схеми для події
const eventSchema = new Schema<IEvent>({
  nameEvent: {
    type: String,
    required: true, // Назва події обов'язкова
    index: true, // Додаємо індекс для швидшого пошуку за назвою
  },
  timeCreated: {
    type: String,
    default: () => new Date().toISOString(), // Дата створення події
  },
  participants: {
    type: [participantsSchema], // Масив учасників
    required: true, // Обов'язкове поле
  },
  expenses: {
    type: [expensesSchema], // Масив витрат
    default: [], // Може бути порожнім
  },
});

// Модель для події
const EventModel = model<IEvent>('Event', eventSchema);

export default EventModel;
