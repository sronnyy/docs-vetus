import pixListResponse from '../../responses/pix/pix_list.json';

export const pixListSection = {
  id: 'pix-list',
  title: 'Listar Transações PIX',
  category: 'endpoints',
  description: 'Lista todas as transações PIX do usuário com filtros por status e paginação. Útil para consultar histórico e realizar reconciliações.',
  endpoint: '/transactions/pix',
  method: 'GET',
  examples: [
    {
      language: 'javascript',
      title: 'Node.js',
      description: 'Listagem de transações PIX com filtros por status e paginação, exibe resposta JSON formatada',
      code: `
async function listPixTransactions(limit = 20, status = null) {
  try {
    const params = new URLSearchParams({
      limit: limit.toString()
    });
    
    if (status) {
      params.append('status', status);
    }

    const response = await fetch(
      \`https://api.vetuspay.com/api/public/v1/transactions/pix?\${params}\`,
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer sk_live_SEU_TOKEN_AQUI',
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const data = await response.json();
    // Exibe a resposta JSON formatada, linha por linha
    console.log(JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Erro ao listar transações PIX:', error);
    throw error;
  }
}

// Exemplos de uso:
listPixTransactions(50); // Lista 50 transações
listPixTransactions(20, 'paid'); // Apenas pagas
listPixTransactions(20, 'pending'); // Apenas pendentes
      `,
      response: JSON.stringify(pixListResponse, null, 2)
    },
    {
      language: 'python',
      title: 'Python',
      description: 'Listagem de transações PIX com filtros e exibição do JSON formatado',
      code: `
import requests
import json

def list_pix_transactions(limit=20, status=None):
    """
    Lista transações PIX do usuário
    
    Args:
        limit (int): Número máximo de transações (máx: 100, padrão: 20)
        status (str): Filtrar por status (pending, paid, expired, failed, refused)
    
    Returns:
        dict: Lista de transações PIX
    """
    try:
        params = {'limit': limit}
        if status:
            params['status'] = status
            
        response = requests.get(
            'https://api.vetuspay.com/api/public/v1/transactions/pix',
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
        print(f"Erro ao listar transações: {e}")
        raise Exception(f"Erro ao listar transações: {e}")

# Exemplos de uso:
list_pix_transactions(50)
list_pix_transactions(20, 'paid')
list_pix_transactions(20, 'pending')
      `,
      response: JSON.stringify(pixListResponse, null, 2)
    },
    {
      language: 'java',
      title: 'Java',
      description: 'Java 11+ HttpClient listando transações PIX com filtros e exibição JSON formatada',
      code: `
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class PixListExample {
  public static void main(String[] args) throws Exception {
    int limit = 50;
    String status = null; // por exemplo: "paid", "pending", "expired", "failed", "refused"
    String base = "https://api.vetuspay.com/api/public/v1/transactions/pix?limit=" + limit;
    String url = status != null ? base + "&status=" + status : base;

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

  // Utilitário para formatar JSON (Jackson necessário no classpath)
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
      response: JSON.stringify(pixListResponse, null, 2)
    },
    {
      language: 'react',
      title: 'React (Hooks)',
      description: 'Componente que lista transações PIX, permite filtro por status e exibe JSON formatado',
      code: `
import { useEffect, useState } from 'react';

export default function PixTransactionsList() {
  const [status, setStatus] = useState('');
  const [limit, setLimit] = useState(20);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const qs = new URLSearchParams({ limit: limit.toString() });
        if (status) qs.append('status', status);
        const res = await fetch(
          \`https://api.vetuspay.com/api/public/v1/transactions/pix?\${qs.toString()}\`,
          {
            headers: {
              'Authorization': 'Bearer sk_live_SEU_TOKEN_AQUI',
              'Accept': 'application/json'
            }
          }
        );
        if (!res.ok) throw new Error('HTTP ' + res.status);
        setData(await res.json());
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [status, limit]);

  return (
    <div>
      <div>
        <label>Status: </label>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="">Todos</option>
          <option value="pending">Pendente</option>
          <option value="paid">Pago</option>
          <option value="expired">Expirado</option>
          <option value="failed">Falhou</option>
          <option value="refused">Recusado</option>
        </select>
        <label> Limite: </label>
        <input
          type="number"
          value={limit}
          onChange={e => setLimit(Number(e.target.value))}
          min="1"
          max="100"
        />
      </div>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
      {data && (
        <div>
          <p>Total: {data.count} transações</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
      `,
      response: JSON.stringify(pixListResponse, null, 2)
    }
  ]
};

export default pixListSection;

