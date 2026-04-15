import { useReducer, useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// ---------------------------------------------------------------------------
// REDUCER — centralise toute la logique de modification de la liste
// Remplace plusieurs fonctions séparées par un seul point d'entrée.
// Chaque "action" décrit CE QUI se passe ; le reducer décide COMMENT mettre
// à jour l'état en fonction de cette action.
// ---------------------------------------------------------------------------
const todosReducer = (state, action) => {
  switch (action.type) {

    // Ajout d'un nouveau todo dans la liste
    case 'ADD':
      return [...state, { id: uuidv4(), text: action.payload, completed: false }];

    // Suppression d'un todo via son identifiant unique
    case 'DELETE':
      return state.filter(todo => todo.id !== action.payload);

    // Basculement de l'état complété / non-complété d'un todo
    case 'TOGGLE':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    // Sécurité : si une action inconnue est envoyée, on retourne l'état tel quel
    default:
      return state;
  }
};

// ---------------------------------------------------------------------------
// ÉTAT INITIAL — todos de départ au chargement du composant
// ---------------------------------------------------------------------------
const initialTodos = [
  { id: uuidv4(), text: 'Acheter du lait',    completed: false },
  { id: uuidv4(), text: 'Acheter du pain',    completed: false },
  { id: uuidv4(), text: 'Acheter du fromage', completed: false },
  { id: uuidv4(), text: 'Faire mon Maxime',   completed: false },
];

// ---------------------------------------------------------------------------
// COMPOSANT PRINCIPAL — TodoV2
// ---------------------------------------------------------------------------
const TodoV2 = () => {

  // useReducer remplace useState pour gérer la liste des todos.
  // dispatch() est la fonction qu'on appelle pour envoyer une action au reducer.
  const [todos, dispatch] = useReducer(todosReducer, initialTodos);

  // État local pour le message d'erreur (champ vide à la soumission)
  const [warning, setWarning] = useState(false);

  // État local pour le filtre d'affichage : 'all' | 'active' | 'completed'
  const [filter, setFilter] = useState('all');

  // État local pour la valeur de l'input d'ajout
  const [inputValue, setInputValue] = useState('');

  // -------------------------------------------------------------------------
  // HANDLERS — useCallback évite de recréer ces fonctions à chaque rendu.
  // Utile si on passait ces fonctions à des composants enfants (mémoïsation).
  // -------------------------------------------------------------------------

  // Ajout d'un nouveau todo : validation + dispatch de l'action ADD
  const handleAdd = useCallback((e) => {
    e.preventDefault();
    // .trim() supprime les espaces en début/fin pour éviter les todos vides " "
    const trimmed = inputValue.trim();

    if (trimmed !== '') {
      setWarning(false);
      dispatch({ type: 'ADD', payload: trimmed });
      setInputValue(''); // Réinitialisation du champ après ajout
    } else {
      setWarning(true);
    }
  }, [inputValue]);

  // Suppression d'un todo : dispatch de l'action DELETE avec l'id ciblé
  const handleDelete = useCallback((id) => {
    dispatch({ type: 'DELETE', payload: id });
  }, []);

  // Basculement complété/non-complété : dispatch de l'action TOGGLE avec l'id
  const handleToggle = useCallback((id) => {
    dispatch({ type: 'TOGGLE', payload: id });
  }, []);

  // -------------------------------------------------------------------------
  // FILTRAGE — calcul dérivé à partir de la liste et du filtre actif.
  // On ne stocke pas la liste filtrée dans un état, on la calcule à la volée.
  // -------------------------------------------------------------------------
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active')    return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // filtre 'all' → on retourne tout
  });

  // Compteurs pour les badges des boutons de filtre
  const activeCount    = todos.filter(t => !t.completed).length;
  const completedCount = todos.filter(t =>  t.completed).length;

  // -------------------------------------------------------------------------
  // RENDU
  // -------------------------------------------------------------------------
  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>

      <h1 className="text-center mb-3">
        {/* Affiche le nombre de todos non-complétés restants */}
        {activeCount} Todo{activeCount !== 1 ? 's' : ''} restant{activeCount !== 1 ? 's' : ''}
      </h1>

      {/* Message d'erreur affiché uniquement si le champ est vide à la soumission */}
      {warning && (
        <div className="alert alert-danger" role="alert">
          Veuillez indiquer un Todo
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* FORMULAIRE D'AJOUT                                                   */}
      {/* ------------------------------------------------------------------ */}
      <form className="mb-3" onSubmit={handleAdd}>
        <div className="card card-body">
          <div className="form-group">
            <label htmlFor="todo-input">Ajouter un Todo</label>
            <input
              id="todo-input"
              className="form-control"
              type="text"
              placeholder="Ex: Acheter du beurre..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="btn btn-success mt-3 btn-block">
              Ajouter
            </button>
          </div>
        </div>
      </form>

      {/* ------------------------------------------------------------------ */}
      {/* BOUTONS DE FILTRE avec badges pour chaque catégorie                 */}
      {/* ------------------------------------------------------------------ */}
      <div className="btn-group mb-3 d-flex" role="group" aria-label="Filtrer les todos">
        <button
          className={`btn btn-outline-secondary ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Tous <span className="badge badge-secondary">{todos.length}</span>
        </button>
        <button
          className={`btn btn-outline-primary ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Actifs <span className="badge badge-primary">{activeCount}</span>
        </button>
        <button
          className={`btn btn-outline-success ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Complétés <span className="badge badge-success">{completedCount}</span>
        </button>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* LISTE DES TODOS                                                       */}
      {/* ------------------------------------------------------------------ */}
      {filteredTodos.length === 0 ? (
        // Message affiché si la liste filtrée est vide
        <p className="text-center text-muted">Aucun todo dans cette catégorie.</p>
      ) : (
        <ul className="list-group">
          {filteredTodos.map(todo => (
            <li
              key={todo.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {/* Zone gauche : case à cocher + texte */}
              <div className="d-flex align-items-center">
                <input
                  type="checkbox"
                  className="mr-3"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                  aria-label={`Marquer "${todo.text}" comme complété`}
                />
                {/* Style barré appliqué si le todo est complété */}
                <span style={todo.completed ? { textDecoration: 'line-through', color: '#aaa' } : {}}>
                  {todo.text}
                </span>
              </div>

              {/* Bouton de suppression */}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(todo.id)}
                aria-label={`Supprimer "${todo.text}"`}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoV2;
