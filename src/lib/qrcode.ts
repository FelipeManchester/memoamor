import QRCode from 'qrcode'

export async function generateQRDataUrl(url: string): Promise<string> {
  return QRCode.toDataURL(url, {
    margin: 2,
    width: 220,
    color: {
      dark: '#7a3f3f',  // wine
      light: '#faf6f1', // cream
    },
  })
}
