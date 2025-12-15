import pixStatusPending from '../../responses/pix/pix_status_pending.json';
import pixStatusPaid from '../../responses/pix/pix_status_paid.json';

export const pixStatusSection = {
  id: 'pix-status',
  title: 'Consultar Status PIX',
  category: 'endpoints',
  description: 'Consulta o status e detalhes de uma transação PIX específica. Use sync=true para forçar sincronização em tempo real com o provedor. Retorna informações completas incluindo QR Code, taxas e dados raw do provedor. Quando status = "paid", também retorna os campos paidAt (data/hora do pagamento), endToEndId (ID end-to-end do PIX) e transactionId (ID da transação).',
  endpoint: '/transactions/pix/<sale_id>',
  method: 'GET',
  examples: [
    {
      language: 'javascript',
      title: 'Node.js',
      description: 'Consulta com sincronização em tempo real, tratamento de erros e exibição da resposta JSON formatada',
      code: `
async function checkPixStatus(saleId, sync = false) {
  // saleId: ID da transação (ex: "69263ae883d8d0025e670125")
  try {
    const url = \`https://api.vetuspay.com/api/public/v1/transactions/pix/\${saleId}\${sync ? '?sync=true' : ''}\`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer sk_live_SEU_TOKEN_AQUI',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const data = await response.json();
    // Exibe a resposta JSON formatada, linha por linha
    console.log(JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Erro ao consultar status PIX:', error);
    throw error;
  }
}

// Exemplos de uso:
checkPixStatus('69263ae883d8d0025e670125'); // Status atual (cached)
checkPixStatus('69263ae883d8d0025e670125', true); // Sincronizar com provedor
      `,
      response: JSON.stringify(pixStatusPending, null, 2)
    },
    {
      language: 'python',
      title: 'Python',
      description: 'Consulta com tratamento de exceções e exibição da resposta JSON formatada',
      code: `
import requests
import json

def check_pix_status(sale_id, sync=False):
    \"\"\"
    Consulta status de uma transação PIX
    
    Args:
        sale_id (str): ID da transação (ex: "69263ae883d8d0025e670125")
        sync (bool): Se True, sincroniza com provedor em tempo real (?sync=true)
    \"\"\"
    try:
        params = {'sync': 'true'} if sync else {}
        
        response = requests.get(
            f'https://api.vetuspay.com/api/public/v1/transactions/pix/{sale_id}',
            headers={
                'Authorization': 'Bearer sk_live_SEU_TOKEN_AQUI',
                'Accept': 'application/json'
            },
            params=params
        )
        response.raise_for_status()
        data = response.json()
        # Exibe a resposta JSON formatada, linha por linha
        print(json.dumps(data, indent=2, ensure_ascii=False))
        return data
    except requests.exceptions.RequestException as e:
        print(f"Erro ao consultar status: {e}")
        raise Exception(f"Erro ao consultar status: {e}")

# Exemplos de uso:
check_pix_status("69263ae883d8d0025e670125")  # Status atual
check_pix_status("69263ae883d8d0025e670125", sync=True)  # Sincronizar
      `,
      response: JSON.stringify(pixStatusPending, null, 2)
    },
    {
      language: 'java',
      title: 'Java',
      description: 'Java 11+ HttpClient com sync opcional, tratamento de erro e exibição do JSON formatado',
      code: `
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class PixStatusExample {
  public static void main(String[] args) throws Exception {
    String saleId = "69263ae883d8d0025e670125"; // ID da transação (<sale_id>)
    boolean sync = true; // true para sincronizar com provedor (?sync=true)
    String url = "https://api.vetuspay.com/api/public/v1/transactions/pix/" + saleId + (sync ? "?sync=true" : "");

    HttpClient client = HttpClient.newHttpClient();
    HttpRequest request = HttpRequest.newBuilder()
      .uri(URI.create(url))
      .header("Authorization", "Bearer sk_live_SEU_TOKEN_AQUI")
      .header("Accept", "application/json")
      .GET()
      .build();

    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
    if (response.statusCode() >= 200 && response.statusCode() < 300) {
      // Exibe o JSON formatado, linha por linha
      System.out.println(prettyPrintJSON(response.body()));
    } else {
      throw new RuntimeException("Erro HTTP: " + response.statusCode());
    }
  }

  // Utilitário simples para formatar JSON (Jackson necessário no classpath)
  public static String prettyPrintJSON(String json) {
    try {
      com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
      Object obj = mapper.readValue(json, Object.class);
      return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(obj);
    } catch (Exception e) {
      return json;
    }
  }
}
      `,
      response: JSON.stringify(pixStatusPending, null, 2)
    },
    {
      language: 'react',
      title: 'React (Hooks)',
      description: 'Consulta estado do PIX sob demanda, com sincronização em tempo real e exibição da resposta formatada',
      code: `
import { useState } from 'react';

export default function PixStatusChecker() {
  const [saleId, setSaleId] = useState('69263ae883d8d0025e670125');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const check = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        \`https://api.vetuspay.com/api/public/v1/transactions/pix/\${saleId}?sync=true\`,
        { headers: { 'Authorization': 'Bearer sk_live_SEU_TOKEN_AQUI', 'Accept': 'application/json' } }
      );
      if (!res.ok) throw new Error('HTTP ' + res.status);
      setData(await res.json());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input value={saleId} onChange={e => setSaleId(e.target.value)} placeholder="saleId" />
      <button onClick={check} disabled={loading}>{loading ? 'Consultando...' : 'Consultar status'}</button>
      {error && <p>Erro: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
      `,
      response: JSON.stringify(pixStatusPending, null, 2)
    }
  ],
  notes: [
    'Quando status = "pending", a resposta inclui campos como brCode, qrCodeUrl, expiresAt, payerName e payerTaxIdMasked.',
    'Quando status = "paid", a resposta inclui adicionalmente: paidAt (ISO 8601), endToEndId (ID end-to-end do PIX) e transactionId (ID da transação do provedor).'
  ]
};

export default pixStatusSection;
