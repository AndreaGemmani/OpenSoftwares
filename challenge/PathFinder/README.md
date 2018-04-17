# PathFinder

Labirinto 50x30, 30% possibilità che un quadrato sia un muro, limite fps non aggiunto

## How To:
- scaricare librerie p5, sketch.js e index.html
- double click su index.html per aprire il programma nel browser 

### About:
L'algoritmo da un valore ad ogni quadratino che va 0 per i muri a 1 per il quadrato d'arrivo e valuta ad ogni passo i
4 quadrati attorno a sé (N/S/E/W), preferendo quadrati non ancora visitati. In caso non ci fossero vie d'uscita da un
percorso i quadratini vengono contrassegnati di rosso. Ad ogni passaggio su una strada già battuta il colore si scurisce 
(scala di blu).

#### Valori:
-0.001 quadrati fuori dai bordi, per non scegliere mai di uscire
0 muri (neri)
0.1 vicolo cieco (rosso)
0.15 - 0.85 strada percorsa da 1 a 15 volte (scala di blu)
0.9 quadratini percorribili non visitati (bianchi)
1 arrivo (verde)
(La partenza inizia con un valore di 0.15)

### ToDo:
- resizability in base alle dimensioni dello schermo (per mobile)
- rendere il numero di righe e colonne, le mosse al secondo e la percentuale di muri creati modificabile
e caricare un nuovo labirinto una volta finito
- provare lo stesso labirinto con altri algoritmi (non ancora implementati)
