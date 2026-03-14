

**Verifique e ajuste a responsividade da Navbar para dispositivos tablet, garantindo que:**

1. **Logo**: O tamanho da logo se adapte proporcionalmente em todos os breakpoints (mobile, tablet e desktop), mantendo a proporção correta sem distorção ou corte, utilizando classes responsivas adequadas (ex: `h-[40px] sm:h-[55px] md:h-[65px] lg:h-[80px]`).

2. **Menu de navegação**: Os itens do menu (links e botões) mantenham tamanho, espaçamento e alinhamento consistentes em resoluções de tablet (768px–1024px), ajustando `gap`, `font-size` e `padding` conforme necessário para evitar sobreposição ou quebra de layout.

3. **Breakpoint intermediário**: Revise o comportamento entre o menu hamburger (mobile) e o menu expandido (desktop), garantindo que no tablet o layout seja funcional e visualmente equilibrado — considere exibir o menu completo a partir de `md:` ou ajustar o ponto de colapso se necessário.

4. **Altura da barra**: Ajuste a altura da Navbar (`h-16 sm:h-20 lg:h-24`) para manter proporção visual adequada em tablets.

