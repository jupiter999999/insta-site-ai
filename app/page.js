'use client';

import { useState } from 'react';

export default function Home() {
  const [profile, setProfile] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  async function analyze(e) {
    e.preventDefault();
    setError('');
    setResult(null);
    if (!profile.trim()) return setError('Digite um @usuario ou link do Instagram.');
    setLoading(true);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Não foi possível analisar.');
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <nav><div className="logo"><span>◆</span> InstaSite <b>AI</b></div><div className="badge">MVP</div></nav>
      <section className="hero">
        <div className="eyebrow">PERFIL → BRIEFING → SITE</div>
        <h1>Transforme um perfil em uma <em>oportunidade de site.</em></h1>
        <p>Organize informações públicas ou autorizadas de um negócio, crie um briefing com IA e prepare a base de um site profissional em minutos.</p>
        <form onSubmit={analyze}>
          <div className="inputWrap"><span>@</span><input value={profile} onChange={e => setProfile(e.target.value)} placeholder="usuario ou instagram.com/usuario" /><button disabled={loading}>{loading ? 'Analisando...' : 'Analisar perfil →'}</button></div>
          <small>Use somente conteúdo público ou que você tenha autorização para reutilizar.</small>
        </form>
        {error && <div className="error">{error}</div>}
      </section>

      <section className="steps">
        <article><i>01</i><h3>Informe o perfil</h3><p>Cole o @ ou link do negócio que será usado como referência.</p></article>
        <article><i>02</i><h3>Organize o conteúdo</h3><p>Nome, bio, serviços, contatos, imagens e legendas entram em um briefing estruturado.</p></article>
        <article><i>03</i><h3>Gere com IA</h3><p>A IA transforma o briefing em estratégia, seções, textos e direção visual para o site.</p></article>
        <article><i>04</i><h3>Preview e venda</h3><p>Revise a demonstração e apresente ao próprio negócio antes da publicação.</p></article>
      </section>

      {result && <section className="result">
        <div className="resultHead"><div><span>BRIEFING GERADO</span><h2>{result.username}</h2></div><button onClick={() => navigator.clipboard.writeText(result.brief)}>Copiar briefing</button></div>
        <pre>{result.brief}</pre>
      </section>}
    </main>
  );
}
