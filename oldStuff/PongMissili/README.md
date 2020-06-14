# Pong con missili

Videogame 1vs1 con missili ed esplosioni e powerup e cose 

## Scopo:
Ridurre a zero la vita dell'avversario colpendolo con missili ed evitando i suoi, con l'aiuto di powerup e bonus 

## Come giocare:
- Giocatore di sinistra muove con W/S, spara con D ed usa powerup con A
- Giocatore di destra muove con frecce su e giù, spara con freccia sinistra ed usa powerup con freccia destra

- Menù di pausa con SPACE (non ancora available)

## Setup:
- Scaricare tutti i fle .js ed inserirli in una cartella
- Scaricare** [p5.js,p5.sound e p5.dom](https://github.com/Gimmmy97/prova-prova/tree/master/challenge/librerie%20p5), inserirle in una sub-cartella rinominandola libraries
- Scaricare, salvare nella cartella principale ed aprire index.html
- Se tutto va come deve il gioco dovrebbe aprirsi in una pagina del browser

### Troubleshooting:
- In caso la pagina aperta fosse vuota o il gioco si bloccasse, aprire nella pagina in base al browser utilizzato: 

Chrome: [menu in alto a destra] -> Altri Strumenti -> Strumenti per sviluppatori

Safari: Sviluppo -> Mostra Console errori 

Altri browser (coming soon)

e riportare gli errori descritti a me o con una pull request o nuova branch o fork su GitHub


** 
se non si vogliono scaricare le librerie p5.js,p5.sound e p5.dom si può scaricare indexOnline.html ed accedere al gioco da lì, in questo modo ogni volta che il gioco viene ricaricato le tre librerie sopra citate verranno scaricate da una repository online, questo implica che è necessaria una connessione internet ad ogni reload e si dovranno attendere alcuni secondi mentre queste vengono scaricate
 



_versione 0.3.0_

aggiunto IndexOnline.html per non scaricare le librerie p5

_versione beta 0.2.1_

aggiunto finePartita() in partita.js

_versione beta 0.2.0_

aggiunto index2.html per uniformare ricerca librerie su windows e MacOS
