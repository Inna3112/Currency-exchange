import React from 'react';
import CurrencyExchange from '../../components/CurrencyExchange/CurrencyExchange';
import {  CurrencyType } from '../../redux/currencyReducer';
import {
    ChangeActionAC,
    ChangeCurrencyFieldAC,
    ChangeCurrentCurrencyAC
} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {selectAmountOfCurrency, selectAmountOfUI, selectCurrencies, selectCurrentCurrency, selectIsBuying} from "../../redux/selectors";


const CurrencyEContainer: React.FC = () => {
    const dispatch = useDispatch()
    const currencies = useSelector(selectCurrencies)
    const currentCurrency = useSelector(selectCurrentCurrency)
    const isBuying = useSelector(selectIsBuying)
    const amountOfUI = useSelector(selectAmountOfUI)
    const amountOfCurrency = useSelector(selectAmountOfCurrency)

    let currencyRate: number = 0;
    const currenciesName = currencies.map((currency: CurrencyType) => {
        if (currency.currencyName === currentCurrency) {
            currencyRate = isBuying ? currency.buyRate : currency.sellRate;
        }
        return currency.currencyName;
    });

    const changeCurrencyField = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value;
        if (!isFinite(+value)) return;
        if (e.currentTarget.dataset.currency) {
            const trigger: string = e.currentTarget.dataset.currency;
            if (trigger === 'ui') {
                if (value === '') {
                    dispatch(ChangeCurrencyFieldAC(value, value));
                } else {
                    dispatch(ChangeCurrencyFieldAC(value, (+Number(value).toFixed(2) / currencyRate).toFixed(2)));
                }
            } else {
                if (value === '') {
                    dispatch(ChangeCurrencyFieldAC(value, value));
                } else {
                    dispatch(ChangeCurrencyFieldAC((+Number(value).toFixed(2) * currencyRate).toFixed(2), value));
                }
            }
        }
    };

    const changeAction = (e: React.MouseEvent<HTMLSpanElement>) => {
        debugger
        e.currentTarget.dataset.action === 'buy' ? dispatch(ChangeActionAC(true))
            : dispatch(ChangeActionAC(false));
    };

    const changeCurrentCurrency = (e: React.MouseEvent<HTMLLIElement>) => {
        e.currentTarget.dataset.currency && dispatch(ChangeCurrentCurrencyAC(e.currentTarget.dataset.currency));
    };

    return (
        <React.Fragment>
            <CurrencyExchange
                currenciesName={currenciesName}
                currentCurrency={currentCurrency}
                currencyRate={currencyRate}
                isBuying={isBuying}
                amountOfUI={amountOfUI}
                amountOfCurrency={amountOfCurrency}
                changeCurrencyField={changeCurrencyField}
                changeAction={changeAction}
                changeCurrentCurrency={changeCurrentCurrency}
            />
        </React.Fragment>
    );
};

export default CurrencyEContainer
