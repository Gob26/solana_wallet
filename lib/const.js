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

export const sendTx = async (tx, signer) => {
    const wallet = await getWallet();
    // Если вы использовали getConnection() как функцию, то раскомментируйте эту строку:
    // const connection = getConnection(); 
    
    const block = await connection.getLatestBlockhash('singleGossip');
    tx.recentBlockhash = block.blockhash;
    
    // ИСПРАВЛЕНИЕ ОПЕЧАТКИ: с freePayer на feePayer
    tx.feePayer = wallet.publicKey; 

    if(signer) tx.partialSign(signer);
    tx = await wallet.signTransaction(tx);
    const rawTransaction = tx.serialize();
    const txId = await connection.sendRawTransaction(rawTransaction);

    return txId
}