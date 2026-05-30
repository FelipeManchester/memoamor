'use client'

export default function PrintQRButton({ qrUrl }: { qrUrl: string }) {
  function handlePrint() {
    const win = window.open('', '_blank', 'width=420,height=520')
    if (!win) return
    win.document.write(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>QR Code — Memoamor</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@600&display=swap" rel="stylesheet" />
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #faf7f2; }
      .box { border: 1.5px dashed #e8c9b5; border-radius: 8px; padding: 24px 28px; text-align: center; }
      img { display: block; margin: 0 auto; border-radius: 4px; }
      p { font-family: 'Fraunces', Georgia, serif; font-size: 16px; color: #e8c9b5; font-weight: 600; margin-top: 12px; letter-spacing: 0.02em; }
      @media print { body { min-height: unset; } }
    </style>
  </head>
  <body>
    <div class="box">
      <img src="${qrUrl}" width="200" height="200" alt="QR Code" />
      <p>Pra sempre com você ❤️</p>
    </div>
    <script>window.onload = function () { window.print(); };<\/script>
  </body>
</html>`)
    win.document.close()
  }

  return (
    <button
      onClick={handlePrint}
      title="Imprimir QR Code"
      className="p-0 text-text-muted/60 hover:text-text-muted transition-colors cursor-pointer bg-transparent border-0 flex items-center"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="6 9 6 2 18 2 18 9" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" />
      </svg>
    </button>
  )
}
