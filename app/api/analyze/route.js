import OpenAI from 'openai';

function normalizeProfile(input = '') {
  const clean = input.trim().replace(/^https?:\/\/(www\.)?instagram\.com\//i, '').replace(/^@/, '').split(/[/?#]/)[0];
  return clean.replace(/[^a-zA-Z0-9._]/g, '');
}

export async function POST(request) {
  try {
    const { profile, publicData } = await request.json();
    const username = normalizeProfile(profile);
    if (!username) return Response.json({ error: 'Perfil inválido.' }, { status: 400 });

    // O MVP não contorna login, bloqueios ou proteções do Instagram.
    // publicData poderá vir de uma integração oficial/provedor autorizado na próxima etapa.
    const source = publicData || {
      username,
      note: 'Ainda não há um conector de Instagram configurado. O briefing abaixo prepara o projeto para receber dados públicos/autorizados.'
    };

    if (!process.env.OPENAI_API_KEY) {
      return Response.json({
        username: '@' + username,
        brief: `PROJETO: Site para @${username}\n\nSTATUS DA COLETA\n${source.note || 'Dados recebidos.'}\n\nOBJETIVO\nCriar uma demonstração profissional destinada ao próprio negócio.\n\nDADOS A ORGANIZAR\n- Nome e bio pública\n- Categoria/serviços\n- Contatos e localização comercial divulgada\n- Imagens autorizadas para demonstração\n- Legendas e informações dos posts\n- CTA principal\n\nSITE SUGERIDO\nHero, Sobre, Serviços, Galeria, Prova social, FAQ e Contato/WhatsApp.\n\nPróximo passo: configurar OPENAI_API_KEY e um conector permitido para os dados do perfil.`
      });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || 'gpt-5.6',
      input: `Você é um estrategista de sites. Crie um briefing objetivo em português para uma demonstração de site destinada ao próprio dono do perfil. Não invente endereço, telefone, preços ou fatos. Diferencie claramente fatos fornecidos de sugestões. Perfil: @${username}. Dados disponíveis: ${JSON.stringify(source)}. Inclua: negócio, objetivo, público provável quando inferível (marque como hipótese), seções, CTA, direção visual, conteúdo disponível e informações ainda necessárias.`
    });

    return Response.json({ username: '@' + username, brief: response.output_text });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Erro interno ao gerar o briefing.' }, { status: 500 });
  }
}
