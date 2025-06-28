"use client"; // Директива Next.js: этот модуль должен быть клиентским компонентом
import { useState } from 'react'; // Импортируем хук useState для управления состоянием React
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'; // Импортируем Keypair и PublicKey из @solana/web3.js
import toBase58 from 'bs58'; // Импортируем библиотеку bs58 для кодирования/декодирования Base58
import styles from './page.module.css'; // Импортируем CSS-модули для стилизации компонента
import { getWallet, connection, sendTx } from '@/lib/const'; // ИСПРАВЛЕНО: импортируем connection из lib/const

export default function Home() {
  const data = {
    Wallet_1: new PublicKey('G8rtHGPWooRBRP9m362MDkyePwJ2Mg3c9w7SmbDN8fjf'),
    Wallet_2: new PublicKey('31joKiojuSfG7Y1hLcJsTNSFLEZR1QNYcuVuzg6upch8')
  }
  
  // Состояние для хранения форматированного вывода (ключей или ошибок)
  const [pre, setPre] = useState('');

  // Вспомогательная функция для обновления состояния 'pre' с JSON-строкой
  const log = data => setPre(JSON.stringify(data, null, 2));

  // Функция для генерации новой пары ключей Solana
  const createKey = () => {
    try {
      const key = Keypair.generate(); // Генерируем новую криптографическую пару ключей
      // Логируем публичный и приватный ключи
      // public: key.publicKey.toBase58() - преобразуем объект PublicKey в строку Base58
      // private: toBase58.encode(key.secretKey) - кодируем Uint8Array приватного ключа в строку Base58
      log({
        public: key.publicKey.toBase58(),
        private: toBase58.encode(key.secretKey),
      });
    } catch (error) {
      // Обработка ошибок при генерации ключей
      log({ error: error.message || "Ошибка при генерации ключа" });
      console.error("Ошибка при генерации ключа:", error);
    }
  };

  const getParsedAcc = async acc => { // ИСПРАВЛЕНО: исправлена опечатка в названии функции
    try {
      const res = await connection.getParsedAccountInfo(acc);
      log(res);
    } catch (error) {
      log({ error: error.message || "Ошибка при получении информации об аккаунте" });
      console.error("Ошибка при получении информации об аккаунте:", error);
    }
  }

  const airdrop = async () => {
    try {
      const wallet = await getWallet();
      if (!wallet) {
        log({ error: "Кошелек не подключен" });
        return;
      }
      log({ message: "Кошелек подключен", publicKey: wallet.publicKey.toString() });
      
      const txId = await connection.requestAirdrop(wallet.publicKey, LAMPORTS_PER_SOL); // ИСПРАВЛЕНО: добавлен await
      log({ transactionId: txId });
    } catch (error) {
      log({ error: error.message || "Ошибка при запросе airdrop" });
      console.error("Ошибка при запросе airdrop:", error);
    }
  }

  const transfer = async () => {
    const wallet = await getWallet();

    const tx = new Transaction();
    tx.add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: data.Wallet_1,
        lamports: LAMPORTS_PER_SOL       
  })
    );
    const txId = await sendTx(tx);
    log(txId)

  }

  return (
    <div className={styles.main}>
      <div className={styles.button}>
        <button onClick={createKey}>Generate Key</button> {/* Кнопка для генерации ключей */}
        <button onClick={airdrop}>AirDrop</button>
        <button onClick={transfer}>Transfer</button>

      </div>
      <div className={styles.dataContainer}>
        {/* Отображаем сгенерированные данные или сообщение по умолчанию */}
        <pre>{pre || 'Нет сгенерированных ключей'}</pre>
        {/* Дополнительно отображаем начальные кошельки для демонстрации.
        * Важно: объекты PublicKey должны быть преобразованы в строки для JSON.stringify. */}
        <h3>Изначальные кошельки:</h3>
        {Object.keys(data).map((k, i) => (
          <h4 key={i} onClick={() => getParsedAcc(data[k])}> {/* ИСПРАВЛЕНО: исправлена опечатка в названии функции */}
            {k} {data[k].toBase58()}
          </h4>
        ))}
        <pre>{JSON.stringify({
          Wallet_1: data.Wallet_1.toBase58(),
          Wallet_2: data.Wallet_2.toBase58(),
        }, null, 2)}</pre>
      </div>
    </div>
  );
}