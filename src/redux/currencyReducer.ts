import {ACTIONS_TYPE, CurrencyReducersTypes } from './actions';


export type CurrencyType = {
    currencyName: string;
    buyRate: number;
    sellRate: number;
};
export type CurrencyState = {
    currencies: Array<CurrencyType>;
    currentCurrency: string;
    isBuying: boolean;
    amountOfUI: string;
    amountOfCurrency: string;
};

const initialState: CurrencyState = {
    currencies: [
        {
            currencyName: 'USD',
            buyRate: 27.24,
            sellRate: 27.46,
        },
        {
            currencyName: 'EUR',
            buyRate: 32.46,
            sellRate: 32.86,
        },
        {
            currencyName: 'RUR',
            buyRate: 0.33,
            sellRate: 0.38,
        },
    ],
    currentCurrency: 'USD',
    isBuying: true,
    amountOfUI: '',
    amountOfCurrency: '',
};

export const currencyReducer = (state: CurrencyState = initialState, action: CurrencyReducersTypes): CurrencyState => {

    switch (action.type) {
        case ACTIONS_TYPE.CHANGE_CURRENCY_FIELD_TYPE:
            return {
                ...state,
                ...action.payload,
            }
        case ACTIONS_TYPE.CHANGE_CHANGE_ACTION:
        case ACTIONS_TYPE.CHANGE_CURRENT_CURRENCY:
            return {
                ...state,
                ...action.payload,
                amountOfUI: '',
                amountOfCurrency: '',
            }
        default:
            return state;
    }
};
