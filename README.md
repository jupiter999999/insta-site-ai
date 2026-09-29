# InstaSite AI

MVP para transformar informações públicas ou autorizadas de perfis comerciais em briefings e, nas próximas etapas, demonstrações de sites geradas por IA.

## Já funciona
- Campo para @usuario ou URL do Instagram
- Normalização do perfil
- Geração de briefing via OpenAI quando `OPENAI_API_KEY` estiver configurada
- Fallback útil sem API
- Interface responsiva

## Rodar localmente
```bash
npm install
cp .env.example .env.local
npm run dev
```
Abra `http://localhost:3000`.

## Arquitetura planejada
1. Conector de dados públicos/autorizados
2. Normalizador de perfil, mídia e legendas
3. Analisador de negócio com IA
4. Gerador estruturado de site
5. Preview isolado
6. Editor por chat
7. Exportação/publicação

## Uso de conteúdo
O projeto não deve contornar autenticação, bloqueios, rate limits ou controles de acesso. Conteúdo de terceiros deve ser reutilizado somente quando houver base/autorização adequada; a publicação final deve ser aprovada pelo responsável pelo negócio.
