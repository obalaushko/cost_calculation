import LOGGER from '../helpers/logger.ts';
import { format } from 'npm:date-fns';
import { toZonedTime } from 'npm:date-fns-tz';

interface IParticipants {
    id: string;
    name: string;
}

interface IExpenses {
    id: string;
    name: string;
    price: string;
    whoShouldPay: IParticipants[];
    whoPaid: IParticipants[];
}

class Event {
    private eventName: string;
    private eventId: string;
    private dateCreated: string;
    private participants: IParticipants[];
    private expenses: IExpenses[];

    constructor(eventName: string) {
        this.eventName = eventName;
        this.eventId = crypto.randomUUID();
        this.participants = [];
        this.expenses = [];
        const timeZone = 'Europe/Kyiv';
        const now = new Date();
        const zonedDate = toZonedTime(now, timeZone);
        this.dateCreated = format(zonedDate, 'dd.MM.yyyy-HH:mm');
    }

    public addParticipants(participants: Omit<IParticipants, 'id'>[]) {
        participants.forEach(({ name }) => {
            this.participants.push({
                id: crypto.randomUUID(),
                name,
            });
        });
    }

    public addExpenses(expenses: Omit<IExpenses, 'id'>[]) {
        expenses.forEach(({ name, price, whoPaid, whoShouldPay }) => {
            this.expenses.push({
                id: crypto.randomUUID(),
                name,
                price,
                whoPaid,
                whoShouldPay,
            });
        });
    }

    public removeParticipantById(participantId: string) {
        this.participants = this.participants.filter(
            (participant) => participant.id !== participantId
        );
        LOGGER.info(`Participant with ID ${participantId} removed.`);
    }

    public removeExpenseById(expenseId: string) {
        this.expenses = this.expenses.filter(
            (expense) => expense.id !== expenseId
        );
        LOGGER.info(`Expense with ID ${expenseId} removed.`);
    }

    public showInfo() {
        LOGGER.info(`${this.eventName} - ${this.dateCreated}`);
        LOGGER.info('Participants: ', this.participants);
        LOGGER.info('Expenses: ', this.expenses);
    }
}

export default Event;
