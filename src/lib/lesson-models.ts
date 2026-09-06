export type Lang = 'es' | 'en';
export type LessonStep = {
  title: string;
  text: string;
  values?: Record<string, number>;
  active?: string[];
  chosen?: string[];
  queens?: string[];
  column?: string;
  knight?: string;
  visited?: string[];
};

export function squarePosition(square: string) {
  return { file: square.charCodeAt(0) - 97, rank: Number(square.slice(1)) };
}

export function isAttacked(square: string, queens: string[]) {
  const a = squarePosition(square);
  return queens.some((queen) => {
    const b = squarePosition(queen);
    return a.file === b.file || a.rank === b.rank || Math.abs(a.file - b.file) === Math.abs(a.rank - b.rank);
  });
}

export function minimaxSteps(lang: Lang): LessonStep[] {
  const es = lang === 'es';
  const leaves = { l1: 1.45, l2: .2, m1: .25, m2: .34, right: 2.32 };
  const left = Math.min(leaves.l1, leaves.l2);
  const middle = Math.min(leaves.m1, leaves.m2);
  return [
    { title: es ? 'De las hojas a la raíz' : 'From leaves to root', text: es ? 'MAX busca el mayor valor. MIN representa al rival, que elige el menor. Pulsa Siguiente para resolver el mismo árbol del texto.' : 'MAX seeks the highest value. MIN represents the opponent, who picks the lowest. Press Next to solve the tree from the text.', values: {}, active: ['root'] },
    { title: es ? '1. Evaluar las hojas' : '1. Evaluate the leaves', text: es ? 'La heurística asigna 1,45; 0,20; 0,25; 0,34 y 2,32. La hoja de la derecha termina antes: no todas las ramas tienen la misma profundidad.' : 'The heuristic assigns 1.45, 0.20, 0.25, 0.34 and 2.32. The right leaf ends earlier: branches need not have the same depth.', values: leaves, active: Object.keys(leaves) },
    { title: es ? '2. MIN elige 0,20' : '2. MIN picks 0.20', text: es ? 'En la rama izquierda el rival escogería min(1,45; 0,20) = 0,20. Ese valor sube al nodo padre; no podemos contar con que el rival nos conceda 1,45.' : 'On the left, the opponent would choose min(1.45, 0.20) = 0.20. That value moves to the parent; we cannot rely on the opponent granting us 1.45.', values: { ...leaves, left }, active: ['left', 'l2'], chosen: ['left-l2'] },
    { title: es ? '3. MIN elige 0,25' : '3. MIN picks 0.25', text: es ? 'En el centro, min(0,25; 0,34) = 0,25. Ya conocemos las tres alternativas que recibirá MAX: 0,20; 0,25 y 2,32.' : 'In the middle, min(0.25, 0.34) = 0.25. MAX now has three alternatives: 0.20, 0.25 and 2.32.', values: { ...leaves, left, middle }, active: ['middle', 'm1'], chosen: ['left-l2', 'middle-m1'] },
    { title: es ? '4. MAX decide: 2,32' : '4. MAX decides: 2.32', text: es ? 'En la raíz, max(0,20; 0,25; 2,32) = 2,32. La rama derecha es la mejor elección con estas valoraciones y suponiendo respuestas óptimas del rival.' : 'At the root, max(0.20, 0.25, 2.32) = 2.32. The right branch is best for these evaluations, assuming optimal replies from the opponent.', values: { ...leaves, left, middle, root: Math.max(left, middle, leaves.right) }, active: ['root', 'right'], chosen: ['left-l2', 'middle-m1', 'root-right'] },
  ];
}

export function queenSteps(lang: Lang): LessonStep[] {
  const es = lang === 'es';
  const fixed = ['b3', 'e2'];
  return [
    { queens: fixed, column: 'a', title: es ? 'Dos damas ya están fijadas' : 'Two queens are already fixed', text: es ? 'Partimos del ejemplo del libro: b3 y e2. En la columna a solo a1 y a5 están libres de ataques. Los círculos señalan opciones; las cruces, casillas atacadas.' : 'Start with the book’s example: b3 and e2. Only a1 and a5 are safe in column a. Circles mark options; crosses mark attacked squares.' },
    { queens: [...fixed, 'a1'], column: 'c', title: es ? 'Probar a1' : 'Try a1', text: es ? 'Elegimos primero a1. Saltamos la columna b, que ya tiene dama. En c solo queda c5: el resto comparte fila o diagonal con alguna dama.' : 'Try a1 first. Skip column b, which already has a queen. Only c5 is safe in column c; every other square shares a rank or diagonal with a queen.' },
    { queens: [...fixed, 'a1', 'c5'], column: 'd', title: es ? 'Callejón sin salida' : 'A dead end', text: es ? 'Colocamos c5. Ahora las cinco casillas de d están atacadas. Esta elección no puede completarse: avanzar a ciegas no resolvería el problema.' : 'Place the queen on c5. All five squares in column d are now attacked. This choice cannot be completed; continuing blindly will not solve it.' },
    { queens: [...fixed, 'a1'], column: 'c', title: es ? 'Retirar c5' : 'Remove c5', text: es ? 'Deshacemos la última colocación. En c no existe otra opción después de c5, así que debemos retroceder una columna más por resolver.' : 'Undo the last placement. There is no option after c5 in column c, so we must backtrack to the previous undecided column.' },
    { queens: fixed, column: 'a', title: es ? 'Volver a la bifurcación' : 'Return to the choice point', text: es ? 'Retiramos a1. Las damas originales b3 y e2 permanecen. Ya exploramos la opción a1; ahora probaremos a5.' : 'Remove a1. The original queens on b3 and e2 remain. We have explored a1; now we will try a5.' },
    { queens: [...fixed, 'a5'], column: 'c', title: es ? 'Probar la alternativa a5' : 'Try the alternative a5', text: es ? 'Al cambiar a1 por a5 cambian las diagonales ocupadas. Ahora c1 es la única opción segura en c.' : 'Switching from a1 to a5 changes the occupied diagonals. Now c1 is the only safe option in column c.' },
    { queens: [...fixed, 'a5', 'c1'], column: 'd', title: es ? 'Colocar c1 abre d4' : 'Placing c1 leaves d4 open', text: es ? 'Con c1 colocada, d4 queda libre de ataques. Esta vez sí podemos completar la última columna.' : 'With c1 occupied, d4 is safe. This time we can complete the last column.' },
    { queens: [...fixed, 'a5', 'c1', 'd4'], title: es ? 'Solución: [5, 3, 1, 4, 2]' : 'Solution: [5, 3, 1, 4, 2]', text: es ? 'Hay una dama por columna y ninguna comparte fila ni diagonal. La vuelta atrás ha descartado una elección fallida y reutilizado las decisiones anteriores.' : 'There is one queen per column, and none share a rank or diagonal. Backtracking discarded a failed choice and reused earlier decisions.' },
  ];
}

// Use the exact route declared by the original figure, validating before replacing it.
export function knightPath(arrows: string): string[] {
  const moves = arrows.split(',').map((move) => move.trim().split('-'));
  const path: string[] = [];
  for (const [from, to] of moves) {
    if (!/^[a-h][1-8]$/.test(from || '') || !/^[a-h][1-8]$/.test(to || '')) throw new Error('Invalid knight square');
    if (!path.length) path.push(from);
    if (path.at(-1) !== from) throw new Error('Disconnected knight route');
    const a = squarePosition(from); const b = squarePosition(to);
    const dx = Math.abs(a.file - b.file); const dy = Math.abs(a.rank - b.rank);
    if (dx * dy !== 2) throw new Error('Illegal knight move');
    path.push(to);
  }
  if (path.length !== 64 || new Set(path).size !== 64) throw new Error('Incomplete knight tour');
  return path;
}

export function knightSteps(arrows: string, lang: Lang): LessonStep[] {
  const path = knightPath(arrows);
  const es = lang === 'es';
  return path.map((square, index) => ({
    knight: square, visited: path.slice(0, index + 1),
    title: es ? `${index + 1} de 64 casillas visitadas` : `${index + 1} of 64 squares visited`,
    text: index === 0
      ? (es ? 'El caballo empieza en a8. Reproduce el recorrido del libro o avanza jugada a jugada. Los números conservan el orden de las visitas.' : 'The knight starts on a8. Play the route from the book or advance one move at a time. Numbers preserve the visiting order.')
      : index === 63
        ? (es ? `${path[index - 1]} → ${square}. Recorrido completo: 63 saltos y 64 casillas distintas, sin repetir ninguna. Es un camino hamiltoniano.` : `${path[index - 1]} → ${square}. Tour complete: 63 moves and 64 distinct squares, without repeats. This is a Hamiltonian path.`)
        : (es ? `${path[index - 1]} → ${square}: dos casillas en un eje y una en el otro. La casilla de llegada no se había visitado. La línea muestra el último salto, no pasos intermedios.` : `${path[index - 1]} → ${square}: two squares on one axis and one on the other. The destination has not been visited before. The line shows the last jump, not intermediate steps.`),
  }));
}
