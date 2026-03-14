

## Prompt Reescrito

**Revise a transição de crossfade entre as imagens do carrossel na seção Hero (`HeroSection.tsx`).** Atualmente, a troca entre slides pode apresentar cortes ou sobreposições bruscas. Ajuste os parâmetros de animação do Framer Motion (`AnimatePresence` + `motion.img`) para garantir um crossfade mais suave e cinematográfico:

- Aumente a duração do fade de opacidade para uma transição mais gradual (ex: 1.2s–1.5s)
- Garanta que a imagem que entra e a que sai se sobreponham de forma harmoniosa, sem flashes brancos ou momentos de container vazio
- Sincronize o efeito Ken Burns (zoom progressivo) com a nova duração do fade
- Mantenha o ciclo de autoplay em 3 segundos, ajustando a relação entre tempo de exibição e tempo de transição

