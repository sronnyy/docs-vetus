import balanceResponse from '../../responses/balance/balance_response.json';

export const balanceSection = {
  id: 'balance',
  title: 'Consultar Saldo',
  category: 'endpoints',
  description: 'Retorna os saldos disponíveis do usuário em tempo real, incluindo valores bloqueados e totais por moeda. Permite filtrar por moedas específicas e incluir detalhes das wallets.',
  endpoint: '/balance',
  method: 'GET',
  examples: [
    {
      language: 'javascript',
      title: 'Node.js',
      description: 'Exemplo completo com tratamento de erros e exibição da resposta JSON formatada',
      code: `
async function getBalance(currencies = null, includeDetail = false) {
  try {
    const params = new URLSearchParams();
    
    if (currencies && Array.isArray(currencies)) {
      currencies.forEach(currency => params.append('currency', currency));
    }
    
    if (includeDetail) {
      params.append('detail', 'true');
    }

    const url = \`https://api.vetuspay.com/api/public/v1/balance\${params.toString() ? '?' + params.toString() : ''}\`;
    
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
    console.error('Erro ao consultar saldo:', error);
    throw error;
  }
}

// Exemplos de uso:
getBalance(); // Saldo completo
getBalance(['BRL', 'USDT']); // Filtrar por moedas específicas
getBalance(null, true); // Com detalhes das wallets
      `,
      response: JSON.stringify(balanceResponse, null, 2)
    },
    {
      language: 'python',
      title: 'Python',
      description: 'Exemplo completo com tratamento de erros e exibição da resposta JSON formatada',
      code: `
import requests
import json

def get_balance(currencies=None, include_detail=False):
    """
    Consulta saldo do usuário
    
    Args:
        currencies (list): Lista de moedas para filtrar (ex: ['BRL', 'USDT'])
        include_detail (bool): Incluir detalhes das wallets
    """
    try:
        params = {}
        
        if currencies:
            params['currency'] = currencies  # requests aceita lista
        
        if include_detail:
            params['detail'] = 'true'
        
        response = requests.get(
            'https://api.vetuspay.com/api/public/v1/balance',
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
        print(f"Erro na requisição: {e}")
        raise Exception(f"Erro na requisição: {e}")

# Exemplos de uso:
get_balance()  # Saldo completo
get_balance(['BRL', 'USDT'])  # Filtrar por moedas
get_balance(include_detail=True)  # Com detalhes
      `,
      response: JSON.stringify(balanceResponse, null, 2)
    },
    {
      language: 'java',
      title: 'Java',
      description: 'Java 11+ HttpClient com headers, tratamento de erros e exibição da resposta JSON formatada',
      code: `
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class BalanceExample {
    public static void main(String[] args) throws Exception {
        // Exemplo com filtro de moedas e detalhes
        String url = "https://api.vetuspay.com/api/public/v1/balance?currency=BRL&currency=USDT&detail=true";
        // Para saldo simples: "https://api.vetuspay.com/api/public/v1/balance"
        
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .header("Authorization", "Bearer sk_live_SEU_TOKEN_AQUI")
            .header("Accept", "application/json")
            .GET()
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() >= 200 && response.statusCode() < 300) {
            String json = response.body();
            // Exibe a resposta JSON formatada, linha por linha
            System.out.println(prettyPrintJSON(json));
        } else {
            throw new RuntimeException("Erro HTTP: " + response.statusCode());
        }
    }

    // Função utilitária para formatar o JSON (sem dependências externas)
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
      response: JSON.stringify(balanceResponse, null, 2)
    },
    {
      language: 'react',
      title: 'React (Hooks)',
      description: 'Componente funcional que busca o saldo ao montar e exibe o JSON formatado',
      code: `
import { useEffect, useState } from 'react';

export default function BalanceViewer() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        // Pode adicionar query params: ?currency=BRL&currency=USDT&detail=true
        const res = await fetch('https://api.vetuspay.com/api/public/v1/balance', {
          headers: {
            'Authorization': 'Bearer sk_live_SEU_TOKEN_AQUI',
            'Accept': 'application/json'
          }
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const json = await res.json();
        setData(json);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  return (
    <pre>
      {data ? JSON.stringify(data, null, 2) : 'Nenhum dado.'}
    </pre>
  );
}
      `,
      response: JSON.stringify(balanceResponse, null, 2)
    }
  ]
};

export default balanceSection;
