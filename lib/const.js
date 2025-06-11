// lib/const.js - константы

import { Connection } from "@solana/web3.js";


export const connection = new Connection(process.env.SOL_RPC, "confirmed");

export const getWallet = async () => {
    if(window.solana) { // Проверяем, установлен ли Phantom (window.solana)
        await window.solana.connect(); // Запрашиваем подключение к кошельку
        return window.solana; // Возвращаем объект Phantom (если успешно подключено)
    }
    else window.open("https://phantom.com/", "_blank"); // Если Phantom не установлен, открываем страницу загрузки
}