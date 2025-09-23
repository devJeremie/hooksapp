import { useState, useEffect } from 'react';

function TestUseEffect() {
    const [count, setCount] = useState(0);
    const [liste, setListe] = useState([]);

    /*count démarre à 0. Chaque clic sur le bouton incrémente count de 1.
À chaque changement de count, le useEffect s'exécute :
Il ajoute dans liste un nouvel élément sous la forme "Item X", 
où X correspond à la valeur courante de count.
Le tableau complet liste est affiché sous forme de < li > dans le JSX.
Un message de log dans la console indique la nouvelle composition du tableau.
Le bouton « Ajouter un item » déclenche uniquement l'incrément du compteur. 
L'ajout dans la liste se produit grâce au useEffect.*/


    // useEffect qui s'exécute à chaque fois que "count" change
    useEffect(() => {
        // On simule un ajout dans la liste lors du changement de count
        setListe(prevListe => [...prevListe, `Item ${count}`]);
        console.log("Le tableau 'liste' a été mis à jour:", liste);
    }, [count]); // le tableau de dépendances comprend "count"

    return (
        <div>
            <h2>Compteur : {count}</h2>
            <button onClick={() => setCount(count + 1)}>Ajouter un item</button>

            <ul>
                {liste.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}
export default TestUseEffect;

/* Le hook useEffect est utilisé ici pour déclencher un effet 
secondaire dès que la valeur de count change.
Le tableau de dépendances passé en second 
argument[count] indique que l'effet ne doit être réexécuté que quand count change.
Dans cet exemple, chaque fois que l’on clique 
sur le bouton, count s’incrémente, ce qui déclenche le useEffect.
Le useEffect ajoute alors un nouvel élément à 
la liste liste, en se basant sur la nouvelle valeur de count.
Cela permet de synchroniser la mise à jour de 
la liste avec la variation du compteur, sans exécuter 
ce code inutilement à chaque rendu.
Donc, useEffect ici sert à exécuter une action secondaire 
liée à un changement d'état particulier (ici count) et à 
gérer la logique qui en dépend (mise à jour du tableau liste) 
de manière propre et contrôlée, évitant par exemple de mettre à jour la liste à 
chaque rendu ou sans raison.
C'est très utile pour gérer des effets secondaires 
comme la récupération de données, la modification du DOM, 
l'abonnement à des événements externes ou toute autre opération 
qui ne fait pas partie directe du rendu JSX.*/

/*useState
Sert à déclarer et gérer l'état local d’un composant 
(valeurs affichées ou utilisées dans le rendu).
Quand on modifie un état avec useState (via la fonction setState), 
React re-render automatiquement le composant avec la nouvelle valeur.
Exemple : stocker et modifier un compteur, une liste d’items, un texte, etc.
useEffect
Sert à gérer les effets secondaires (side effects), 
c’est-à-dire les opérations qui doivent se faire après que le rendu du composant est réalisé.
Ces effets peuvent être la mise à jour du DOM hors du JSX, un appel API, 
l’abonnement à un événement, ou synchroniser un état avec d’autres sources.
useEffect est déclenché après le rendu, pas pour modifier l’état 
directement (même si ça peut arriver avec précaution).
Permet de contrôler quand l’effet se déclenche 
grâce à un tableau de dépendances.
Dans le cadre de l’exemple avec un tableau :
useState stocke la liste des éléments (c’est la donnée elle-même).
useEffect sert à réagir quand une donnée change (ici count). 
Par exemple, on veut ajouter un nouvel item automatiquement dans 
le tableau quand count change.
Sans useEffect, il faudrait mettre à jour la liste directement 
dans l'événement (bouton) ce qui ne serait pas toujours pratique. 
useEffect permet de centraliser et de contrôler clairement 
cette mise à jour en fonction d’une dépendance.*/

/*Comparatif entre useState et useEffect*/
/*const [count, setCount] = useState(0);
const [liste, setListe] = useState([]);

const ajouterItem = () => {
  setCount(count + 1);
  setListe([...liste, `Item ${count + 1}`]);
};*/
/*Avec useState + useEffect(mise à jour automatique liée à count)
useEffect(() => {
  setListe(l => [...l, `Item ${count}`]);
}, [count]);

const incrementer = () => setCount(count + 1);
Ici, useEffect écoute juste le changement de count et effectue une action secondaire 
(mettre à jour la liste). Cela clarifie la logique et évite de mélanger 
directement les modifications d'état dans plusieurs fonctions.
En résumé
useState gère l’état lui-même.
useEffect gère les effets qui doivent arriver après un rendu, 
souvent en réaction à un changement d’état.
Leur usage combiné permet de mieux organiser et séparer la 
logique dans un composant React.*/

