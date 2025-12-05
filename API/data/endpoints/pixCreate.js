import pixCreated201 from '../../responses/pix/pix_created_201.json';
import pixCreateRequest from '../../responses/pix/pix_create_request.json';

export const pixCreateSection = {
  id: 'pix-create',
  title: 'Criar Cobrança PIX',
  category: 'endpoints',
  description: 'Cria uma nova cobrança PIX instantânea com QR Code. Utilize Idempotency Key para evitar cobranças duplicadas. O endpoint retorna o QR Code em formato EMV e URL da imagem.',
  endpoint: '/transactions/pix',
  method: 'POST',
  examples: [
    {
      language: 'javascript',
      title: 'Node.js',
      description: 'Criação completa de cobrança PIX com todos os campos, tratamento de erros e exibição da resposta JSON formatada',
      code: `
// Base URL da API
const API_BASE_URL = 'https://api.vetuspay.com/api/public/v1';
const API_TOKEN = 'sk_live_SEU_TOKEN_AQUI'; // Substitua pelo seu token

async function createPixCharge(amountCents, comment = '') {
  // Monta o payload da requisição
  // IMPORTANTE: amount_cents aceita snake_case ou camelCase (amountCents)
  const payload = {
    amount_cents: amountCents, // Valor em centavos (obrigatório)
    // Exemplo: R$ 50,00 = 5000 centavos
    comment: comment            // Descrição opcional para identificação
  };

  // Headers obrigatórios para todas as requisições
  const headers = {
    'Authorization': \`Bearer \${API_TOKEN}\`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // Idempotency-Key: use para evitar cobranças duplicadas (recomendado)
    'Idempotency-Key': crypto.randomUUID() // Gera UUID v4
  };

  try {
    const response = await fetch(\`\${API_BASE_URL}/transactions/pix\`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    // Verifica se a requisição foi bem-sucedida
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(\`Erro HTTP \${response.status}: \${JSON.stringify(errorData)}\`);
    }

    const result = await response.json();
    // result contém: saleId, qrCode, qrCodeUrl, status, amountCents, feeCents, netCents
    console.log('Cobrança criada:', JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error('Erro ao criar cobrança PIX:', error);
    throw error;
  }
}

// Exemplo de uso:
// Criar cobrança de R$ 50,00
createPixCharge(5000, 'Pagamento de serviço premium');
      `,
      request: JSON.stringify(pixCreateRequest, null, 2),
      response: JSON.stringify(pixCreated201, null, 2)
    },
    {
      language: 'python',
      title: 'Python',
      description: 'Criação de cobrança PIX com resposta formatada e tratamento de exceções',
      code: `
import requests
import uuid
import json

# Configuração da API
API_BASE_URL = 'https://api.vetuspay.com/api/public/v1'
API_TOKEN = 'sk_live_SEU_TOKEN_AQUI'  # Substitua pelo seu token

def create_pix_charge(amount_cents, comment=''):
    """
    Cria uma nova cobrança PIX
    
    Args:
        amount_cents (int): Valor em centavos (obrigatório)
                          Exemplo: R$ 50,00 = 5000
        comment (str): Descrição opcional para identificação
    
    Returns:
        dict: Dados da cobrança criada com saleId, qrCode, qrCodeUrl, etc.
    """
    # Monta o payload da requisição
    # IMPORTANTE: aceita amount_cents (snake_case) ou amountCents (camelCase)
    payload = {
        "amount_cents": amount_cents,  # Valor obrigatório em centavos
        "comment": comment             # Opcional
    }
    
    # Headers obrigatórios para todas as requisições
    headers = {
        'Authorization': f'Bearer {API_TOKEN}',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        # Idempotency-Key: use para evitar cobranças duplicadas (recomendado)
        'Idempotency-Key': str(uuid.uuid4())  # Gera UUID v4
    }
    
    try:
        response = requests.post(
            f'{API_BASE_URL}/transactions/pix',
            json=payload,
            headers=headers,
            timeout=30
        )
        
        # Verifica erros HTTP
        response.raise_for_status()
        
        data = response.json()
        # data contém: saleId, qrCode, qrCodeUrl, status, amountCents, feeCents, netCents
        print(json.dumps(data, indent=2, ensure_ascii=False))
        return data
    except requests.exceptions.HTTPError as e:
        error_data = e.response.json() if e.response else {}
        print(f"Erro HTTP {e.response.status_code}: {error_data}")
        raise
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")
        raise

# Exemplo de uso:
# Criar cobrança de R$ 50,00
create_pix_charge(5000, "Pagamento de serviço premium")
      `,
      request: JSON.stringify(pixCreateRequest, null, 2),
      response: JSON.stringify(pixCreated201, null, 2)
    },
    {
      language: 'java',
      title: 'Java',
      description: 'Java 11+ HttpClient para POST com corpo JSON, tratamento de erros e resposta formatada',
      code: `
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.UUID;

public class PixCreateExample {
  // Configuração da API
  private static final String API_BASE_URL = "https://api.vetuspay.com/api/public/v1";
  private static final String API_TOKEN = "sk_live_SEU_TOKEN_AQUI"; // Substitua pelo seu token

  public static void main(String[] args) throws Exception {
    // Monta o payload JSON
    // IMPORTANTE: aceita amount_cents (snake_case) ou amountCents (camelCase)
    String payload = "{"
      + "\\\"amount_cents\\\":5000,"  // Valor obrigatório em centavos (R$ 50,00 = 5000)
      + "\\\"comment\\\":\\\"Pagamento de serviço premium\\\""  // Opcional
      + "}";

    HttpClient client = HttpClient.newBuilder()
      .connectTimeout(Duration.ofSeconds(30))
      .build();
    
    HttpRequest request = HttpRequest.newBuilder()
      .uri(URI.create(API_BASE_URL + "/transactions/pix"))
      .timeout(Duration.ofSeconds(30))
      .header("Authorization", "Bearer " + API_TOKEN)
      .header("Content-Type", "application/json")
      .header("Accept", "application/json")
      // Idempotency-Key: use para evitar cobranças duplicadas (recomendado)
      .header("Idempotency-Key", UUID.randomUUID().toString())
      .POST(HttpRequest.BodyPublishers.ofString(payload))
      .build();

    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
    
    if (response.statusCode() >= 200 && response.statusCode() < 300) {
      // Resposta contém: saleId, qrCode, qrCodeUrl, status, amountCents, feeCents, netCents
      System.out.println("Cobrança criada:");
      System.out.println(prettyPrintJSON(response.body()));
    } else {
      throw new RuntimeException("Erro HTTP " + response.statusCode() + ": " + response.body());
    }
  }

  // Utilitário para formatar JSON (requer Jackson no classpath)
  public static String prettyPrintJSON(String json) {
    try {
      com.fasterxml.jackson.databind.ObjectMapper mapper = 
        new com.fasterxml.jackson.databind.ObjectMapper();
      Object obj = mapper.readValue(json, Object.class);
      return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(obj);
    } catch (Exception e) {
      return json; // Retorna JSON original se falhar
    }
  }
}
      `,
      request: JSON.stringify(pixCreateRequest, null, 2),
      response: JSON.stringify(pixCreated201, null, 2)
    },
    {
      language: 'react',
      title: 'React (Hooks)',
      description: 'Hook simples para criar cobrança PIX e exibir o resultado formatado',
      code: `
import { useState } from 'react';

// Configuração da API (em produção, use variáveis de ambiente)
const API_BASE_URL = 'https://api.vetuspay.com/api/public/v1';
const API_TOKEN = 'sk_live_SEU_TOKEN_AQUI'; // Substitua pelo seu token

export default function PixCreateDemo() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPix = async (amountCents, comment = '') => {
    setLoading(true);
    setError(null);
    
    try {
      // Monta o payload
      // IMPORTANTE: aceita amount_cents (snake_case) ou amountCents (camelCase)
      const payload = {
        amount_cents: amountCents, // Valor em centavos (obrigatório)
        comment: comment           // Descrição opcional
      };

      const res = await fetch(\`\${API_BASE_URL}/transactions/pix\`, {
        method: 'POST',
        headers: {
          'Authorization': \`Bearer \${API_TOKEN}\`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // Idempotency-Key: use para evitar cobranças duplicadas (recomendado)
          'Idempotency-Key': crypto.randomUUID() // ou use uma biblioteca UUID
        },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(\`Erro HTTP \${res.status}: \${JSON.stringify(errorData)}\`);
      }
      
      const data = await res.json();
      // data contém: saleId, qrCode, qrCodeUrl, status, amountCents, feeCents, netCents
      setResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => createPix(5000, 'Pagamento de teste')} disabled={loading}>
        {loading ? 'Criando...' : 'Criar cobrança PIX'}
      </button>
      {error && <p className="text-red-400">Erro: {error}</p>}
      {result && (
        <div>
          <p>Cobrança criada com sucesso!</p>
          <pre className="bg-gray-800 p-4 rounded">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
      `,
      request: JSON.stringify(pixCreateRequest, null, 2),
      response: JSON.stringify(pixCreated201, null, 2)
    }
  ]
};

export default pixCreateSection;
