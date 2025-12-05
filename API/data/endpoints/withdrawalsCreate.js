import withdrawalApproved from '../../responses/withdrawals/withdrawal_approved_200.json';
import withdrawalCreateRequest from '../../responses/withdrawals/withdrawal_create_request.json';

export const withdrawalsCreateSection = {
  id: 'withdrawals-create',
  title: 'Criar Saque',
  category: 'endpoints',
  description: 'Solicita um saque para o CPF cadastrado do usuário. O valor será transferido via PIX automaticamente. O valor deve estar entre MIN_WITHDRAWAL_CENTS e MAX_WITHDRAWAL_CENTS. Use Idempotency Key para evitar saques duplicados.',
  endpoint: '/withdrawals',
  method: 'POST',
  examples: [
    {
      language: 'javascript',
      title: 'Node.js',
      description: 'Solicitação de saque com validação, tratamento de erros e exibição da resposta JSON formatada',
      code: `
// Base URL da API
const API_BASE_URL = 'https://api.vetuspay.com/api/public/v1';
const API_TOKEN = 'sk_live_SEU_TOKEN_AQUI'; // Substitua pelo seu token

async function requestWithdrawal(amountCents) {
  // Monta o payload da requisição
  // IMPORTANTE: amount_cents aceita snake_case ou camelCase (amountCents)
  // O valor deve estar entre MIN_WITHDRAWAL_CENTS e MAX_WITHDRAWAL_CENTS
  const payload = {
    amount_cents: amountCents  // Valor em centavos (obrigatório)
    // Exemplo: R$ 100,00 = 10000 centavos
    // amountCents: amountCents  // Alternativa em camelCase
  };

  // Headers obrigatórios para todas as requisições
  const headers = {
    'Authorization': \`Bearer \${API_TOKEN}\`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // Idempotency-Key: use para evitar saques duplicados (recomendado)
    'Idempotency-Key': crypto.randomUUID() // Gera UUID v4
  };

  try {
    const response = await fetch(\`\${API_BASE_URL}/withdrawals\`, {
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
    // result contém: wid, status, amount_cents, fee_cents, net_amount_cents,
    //                balances (current/after), destination, transaction, etc.
    console.log('Saque solicitado:', JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error('Erro ao solicitar saque:', error);
    throw error;
  }
}

// Exemplo de uso:
// Solicitar saque de R$ 100,00
requestWithdrawal(10000);
      `,
      request: JSON.stringify(withdrawalCreateRequest, null, 2),
      response: JSON.stringify(withdrawalApproved, null, 2)
    },
    {
      language: 'python',
      title: 'Python',
      description: 'Solicita saque e exibe a resposta JSON formatada',
      code: `
import requests
import uuid
import json

# Configuração da API
API_BASE_URL = 'https://api.vetuspay.com/api/public/v1'
API_TOKEN = 'sk_live_SEU_TOKEN_AQUI'  # Substitua pelo seu token

def request_withdrawal(amount_cents):
    """
    Solicita um saque para o CPF cadastrado do usuário
    
    Args:
        amount_cents (int): Valor em centavos para saque (obrigatório)
                          Exemplo: R$ 100,00 = 10000
                          Deve estar entre MIN_WITHDRAWAL_CENTS e MAX_WITHDRAWAL_CENTS
    
    Returns:
        dict: Dados do saque solicitado com wid, status, balances, destination, etc.
    """
    # Monta o payload da requisição
    # IMPORTANTE: aceita amount_cents (snake_case) ou amountCents (camelCase)
    payload = {
        "amount_cents": amount_cents  # Valor obrigatório em centavos
        # "amountCents": amount_cents  # Alternativa em camelCase
    }
    
    # Headers obrigatórios para todas as requisições
    headers = {
        'Authorization': f'Bearer {API_TOKEN}',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        # Idempotency-Key: use para evitar saques duplicados (recomendado)
        'Idempotency-Key': str(uuid.uuid4())  # Gera UUID v4
    }
    
    try:
        response = requests.post(
            f'{API_BASE_URL}/withdrawals',
            json=payload,
            headers=headers,
            timeout=60  # Timeout maior pois saques podem demorar
        )
        
        # Verifica erros HTTP
        response.raise_for_status()
        
        data = response.json()
        # data contém: wid, status, amount_cents, fee_cents, net_amount_cents,
        #              balances (current/after), destination, transaction, etc.
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
# Solicitar saque de R$ 100,00
request_withdrawal(10000)
      `,
      request: JSON.stringify(withdrawalCreateRequest, null, 2),
      response: JSON.stringify(withdrawalApproved, null, 2)
    },
    {
      language: 'java',
      title: 'Java',
      description: 'Java 11+ HttpClient para solicitar saque, tratamento de erro e resposta formatada',
      code: `
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

public class WithdrawalCreateExample {
  public static void main(String[] args) throws Exception {
    String json = "{" + "\\\"amount_cents\\\":10000" + "}";
    HttpClient client = HttpClient.newHttpClient();
    HttpRequest request = HttpRequest.newBuilder()
      .uri(URI.create("https://api.vetuspay.com/api/public/v1/withdrawals"))
      .timeout(Duration.ofSeconds(60))
      .header("Authorization", "Bearer sk_live_SEU_TOKEN_AQUI")
      .header("Content-Type", "application/json")
      .header("Accept", "application/json")
      .header("Idempotency-Key", "123e4567-e89b-12d3-a456-426614174000")
      .POST(HttpRequest.BodyPublishers.ofString(json))
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
      request: JSON.stringify(withdrawalCreateRequest, null, 2),
      response: JSON.stringify(withdrawalApproved, null, 2)
    },
    {
      language: 'react',
      title: 'React (Hooks)',
      description: 'Formulário mínimo para solicitar saque e exibir resposta JSON formatada',
      code: `
import { useState } from 'react';

export default function WithdrawalForm() {
  const [amount, setAmount] = useState(10000);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://api.vetuspay.com/api/public/v1/withdrawals', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer sk_live_SEU_TOKEN_AQUI',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Idempotency-Key': '123e4567-e89b-12d3-a456-426614174000'
        },
        body: JSON.stringify({ amount_cents: Number(amount) })
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      setData(await res.json());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit}>
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Solicitar saque'}
      </button>
      {error && <p>Erro: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </form>
  );
}
      `,
      request: JSON.stringify(withdrawalCreateRequest, null, 2),
      response: JSON.stringify(withdrawalApproved, null, 2)
    }
  ]
};

export default withdrawalsCreateSection;
