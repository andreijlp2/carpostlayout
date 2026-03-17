

## Plano: Padronizar cores de hover nos botões de redes sociais

**Objetivo:** Aplicar cores oficiais de cada rede social no hover dos ícones (Facebook, Instagram, YouTube) em todos os locais do projeto onde aparecem.

### Mudanças:

1. **HeroSection.tsx** — Adicionar cores de hover específicas por rede social:
   - Facebook: `hover:bg-[#1877F2]`
   - Instagram: gradiente rosa/laranja `hover:bg-gradient-to-tr from-[#f09433] to-[#dc2743]`
   - YouTube: `hover:bg-[#FF0000]`

2. **Footer.tsx** e **ContactSection.tsx** — Verificar se existem ícones sociais e aplicar o mesmo padrão de cores de hover.

3. Manter `hover:text-white` em todos e remover o genérico `hover:bg-white/25`.

