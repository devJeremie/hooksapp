import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoV2 from './TodoV2';

// =============================================================================
// NOTE TECHNIQUE
// React 18 + user-event v13 : les mises à jour d'état déclenchées par des
// interactions utilisateur doivent être enveloppées dans act() pour que React
// traite tous les effets avant que les assertions ne s'exécutent.
// → Chaque appel userEvent est donc placé dans act(() => { ... }).
// =============================================================================

// =============================================================================
// SUITE DE TESTS — TodoV2
// Deux grandes catégories :
//   - Tests unitaires  : vérifient un élément isolé (rendu, état initial…)
//   - Tests fonctionnels : simulent des interactions utilisateur complètes
// =============================================================================

// -----------------------------------------------------------------------------
// 1. TESTS UNITAIRES — Rendu initial
// Vérifient que le composant s'affiche correctement sans aucune interaction.
// -----------------------------------------------------------------------------
describe('Rendu initial', () => {

  test('le composant se monte sans erreur', () => {
    render(<TodoV2 />);
  });

  test('affiche 4 todos au démarrage', () => {
    render(<TodoV2 />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(4);
  });

  test('le titre indique 4 todos restants', () => {
    render(<TodoV2 />);
    expect(screen.getByText(/4 todos restants/i)).toBeInTheDocument();
  });

  test('le champ de saisie est vide au démarrage', () => {
    render(<TodoV2 />);
    const input = screen.getByLabelText(/ajouter un todo/i);
    expect(input).toHaveValue('');
  });

  test('les 3 boutons de filtre sont présents', () => {
    render(<TodoV2 />);
    expect(screen.getByRole('button', { name: /tous/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /actifs/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /complétés/i })).toBeInTheDocument();
  });

  test("aucun message d'alerte affiché au démarrage", () => {
    render(<TodoV2 />);
    expect(screen.queryByText(/veuillez indiquer un todo/i)).not.toBeInTheDocument();
  });

});

// -----------------------------------------------------------------------------
// 2. TESTS UNITAIRES — Validation du formulaire
// -----------------------------------------------------------------------------
describe('Validation du formulaire', () => {

  test("affiche un message d'alerte si on soumet un champ vide", () => {
    render(<TodoV2 />);
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /ajouter/i }));
    });
    expect(screen.getByText(/veuillez indiquer un todo/i)).toBeInTheDocument();
  });

  test("affiche un message d'alerte si le champ ne contient que des espaces", () => {
    render(<TodoV2 />);
    act(() => {
      userEvent.type(screen.getByLabelText(/ajouter un todo/i), '   ');
    });
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /ajouter/i }));
    });
    expect(screen.getByText(/veuillez indiquer un todo/i)).toBeInTheDocument();
  });

  test("le message d'alerte disparaît après un ajout valide", () => {
    render(<TodoV2 />);
    // 1. Provoquer l'alerte
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /ajouter/i }));
    });
    expect(screen.getByText(/veuillez indiquer un todo/i)).toBeInTheDocument();
    // 2. Soumettre un todo valide → l'alerte doit disparaître
    act(() => {
      userEvent.type(screen.getByLabelText(/ajouter un todo/i), 'Nouveau todo');
    });
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /ajouter/i }));
    });
    expect(screen.queryByText(/veuillez indiquer un todo/i)).not.toBeInTheDocument();
  });

});

// -----------------------------------------------------------------------------
// 3. TESTS FONCTIONNELS — Ajout d'un todo
// -----------------------------------------------------------------------------
describe("Ajout d'un todo", () => {

  test('un nouveau todo apparaît dans la liste après soumission', () => {
    render(<TodoV2 />);
    act(() => {
      userEvent.type(screen.getByLabelText(/ajouter un todo/i), 'Apprendre useReducer');
    });
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /ajouter/i }));
    });
    expect(screen.getByText('Apprendre useReducer')).toBeInTheDocument();
  });

  test('le champ de saisie est réinitialisé après un ajout réussi', () => {
    render(<TodoV2 />);
    const input = screen.getByLabelText(/ajouter un todo/i);
    act(() => {
      userEvent.type(input, 'Todo temporaire');
    });
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /ajouter/i }));
    });
    expect(input).toHaveValue('');
  });

  test('le compteur dans le titre augmente après un ajout', () => {
    render(<TodoV2 />);
    expect(screen.getByText(/4 todos restants/i)).toBeInTheDocument();
    act(() => {
      userEvent.type(screen.getByLabelText(/ajouter un todo/i), 'Cinquième todo');
    });
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /ajouter/i }));
    });
    expect(screen.getByText(/5 todos restants/i)).toBeInTheDocument();
  });

});

// -----------------------------------------------------------------------------
// 4. TESTS FONCTIONNELS — Suppression d'un todo
// -----------------------------------------------------------------------------
describe("Suppression d'un todo", () => {

  test('un todo est retiré de la liste après clic sur ×', () => {
    render(<TodoV2 />);
    act(() => {
      userEvent.click(screen.getByLabelText(/supprimer "acheter du lait"/i));
    });
    expect(screen.queryByText('Acheter du lait')).not.toBeInTheDocument();
  });

  test('il reste 3 todos après en avoir supprimé un', () => {
    render(<TodoV2 />);
    act(() => {
      userEvent.click(screen.getByLabelText(/supprimer "acheter du lait"/i));
    });
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  test('le compteur de todos restants diminue après une suppression', () => {
    render(<TodoV2 />);
    act(() => {
      userEvent.click(screen.getByLabelText(/supprimer "acheter du lait"/i));
    });
    expect(screen.getByText(/3 todos restants/i)).toBeInTheDocument();
  });

});

// -----------------------------------------------------------------------------
// 5. TESTS FONCTIONNELS — Basculement complété / non-complété (toggle)
// -----------------------------------------------------------------------------
describe('Basculement complété / non-complété', () => {

  test('cocher un todo applique le style barré sur son texte', () => {
    render(<TodoV2 />);
    act(() => {
      userEvent.click(screen.getByLabelText(/marquer "acheter du lait" comme complété/i));
    });
    const todoText = screen.getByText('Acheter du lait');
    expect(todoText).toHaveStyle({ textDecoration: 'line-through' });
  });

  test('décocher un todo supprime le style barré', () => {
    render(<TodoV2 />);
    const checkbox = screen.getByLabelText(/marquer "acheter du lait" comme complété/i);
    act(() => { userEvent.click(checkbox); });
    act(() => { userEvent.click(checkbox); });
    expect(screen.getByText('Acheter du lait')).not.toHaveStyle({ textDecoration: 'line-through' });
  });

  test('le compteur de restants diminue quand un todo est coché', () => {
    render(<TodoV2 />);
    expect(screen.getByText(/4 todos restants/i)).toBeInTheDocument();
    act(() => {
      userEvent.click(screen.getByLabelText(/marquer "acheter du lait" comme complété/i));
    });
    expect(screen.getByText(/3 todos restants/i)).toBeInTheDocument();
  });

  test('le compteur de restants remonte quand un todo est décoché', () => {
    render(<TodoV2 />);
    const checkbox = screen.getByLabelText(/marquer "acheter du lait" comme complété/i);
    act(() => { userEvent.click(checkbox); }); // → 3 restants
    act(() => { userEvent.click(checkbox); }); // → 4 restants
    expect(screen.getByText(/4 todos restants/i)).toBeInTheDocument();
  });

});

// -----------------------------------------------------------------------------
// 6. TESTS FONCTIONNELS — Filtrage
// -----------------------------------------------------------------------------
describe('Filtrage de la liste', () => {

  test('le filtre "Actifs" masque les todos complétés', () => {
    render(<TodoV2 />);
    // On complète le premier todo
    act(() => {
      userEvent.click(screen.getByLabelText(/marquer "acheter du lait" comme complété/i));
    });
    // On applique le filtre Actifs
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /actifs/i }));
    });
    expect(screen.queryByText('Acheter du lait')).not.toBeInTheDocument();
    expect(screen.getByText('Acheter du pain')).toBeInTheDocument();
  });

  test('le filtre "Complétés" n\'affiche que les todos cochés', () => {
    render(<TodoV2 />);
    act(() => {
      userEvent.click(screen.getByLabelText(/marquer "acheter du lait" comme complété/i));
    });
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /complétés/i }));
    });
    expect(screen.getByText('Acheter du lait')).toBeInTheDocument();
    expect(screen.queryByText('Acheter du pain')).not.toBeInTheDocument();
  });

  test('le filtre "Tous" réaffiche l\'ensemble de la liste', () => {
    render(<TodoV2 />);
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /actifs/i }));
    });
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /tous/i }));
    });
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
  });

  test('affiche le message "Aucun todo" si le filtre Complétés est vide', () => {
    render(<TodoV2 />);
    // Aucun todo coché → filtre Complétés → liste vide
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /complétés/i }));
    });
    expect(screen.getByText(/aucun todo dans cette catégorie/i)).toBeInTheDocument();
  });

});
