/**
 * Transition de page (DA §4 « transitions de page douces »).
 *
 * `template.tsx` — et non `layout.tsx` — car Next lui attribue une clé unique
 * par segment : il est donc remonté à chaque navigation, ce qui rejoue le fondu.
 * Un layout, lui, persiste et ne rejouerait rien.
 *
 * Reste un Server Component : le fondu est une animation CSS (cf. `.page-enter`
 * dans globals.css), donc zéro JS client et aucun risque de page invisible si
 * l'hydratation échoue.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
