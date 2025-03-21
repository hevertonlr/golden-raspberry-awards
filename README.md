# Golden Raspberry Awards API

Esta é uma API RESTful desenvolvida em NestJS para gerenciar e consultar dados sobre os indicados e vencedores da categoria **Pior Filme** do Golden Raspberry Awards.

## Requisitos do Sistema

- Node.js (v16 ou superior)
- npm, yarn ou pnpm (gerenciador de pacotes)
- SQLite (banco de dados embutido)

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/hevertonlr/golden-raspberry-awards.git
   cd golden-raspberry-awards
   ```

2. Instale as dependências:

   ```bash
   pnpm install
   ```

3. Configure as variáveis de ambiente:

   - Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:
     ```env
     CSV_FILE_PATH=data/movies.csv
     CHUNK_SIZE=100
     ```

4. Execute a aplicação:

   ```bash
   pnpm start
   ```

   A aplicação estará disponível em `http://localhost:3000`.

---

## Endpoints da API

A API possui os seguintes endpoints:

### 1. **Obter Intervalos dos Produtores**

Retorna o produtor com o maior intervalo entre dois prêmios consecutivos e o produtor com o menor intervalo.

- **Método**: `GET`
- **Endpoint**: `/movies/producers-intervals`
- **Exemplo de Requisição**:

  ```bash
   curl -X GET http://localhost:3000/movies/producers-intervals
  ```

- **Exemplo de Resposta**:
  ```json
  {
    "min": [
      {
        "producer": "Producer X",
        "interval": 1,
        "previousWin": 2000,
        "followingWin": 2001
      }
    ],
    "max": [
      {
        "producer": "Producer Y",
        "interval": 10,
        "previousWin": 1990,
        "followingWin": 2000
      }
    ]
  }
  ```

---

## Variáveis de Ambiente

O projeto utiliza as seguintes variáveis de ambiente, que devem ser configuradas no arquivo `.env`:

| Variável        | Descrição                                           | Valor Padrão      |
| --------------- | --------------------------------------------------- | ----------------- |
| `CSV_FILE_PATH` | Caminho para o arquivo CSV com os dados dos filmes. | `data/movies.csv` |
| `CHUNK_SIZE`    | Tamanho do chunk para inserção de dados no banco.   | `100`             |

---

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
data/                        # Arquivos de base (CSV)
src/
├── core/                    # Lógica de domínio (entidades, casos de uso, interfaces)
├── application/             # Camada de aplicação (serviços, controladores, DTOs)
├── infrastructure/          # Camada de infraestrutura (banco de dados, serviços externos)
├── shared/                  # Camada de arquivos compartilhados (utils, exceptions)
└── main.ts                  # Ponto de entrada da aplicação
```

---

## Executando os Testes

Para executar os testes de integração, utilize o seguinte comando:

```bash
pnpm test:e2e
```

---

## Exemplo de Arquivo CSV (`movies.csv`)

O arquivo CSV deve seguir o formato abaixo:

```csv
year;title;studios;producers;winner
1980;Movie A;Studio X;Producer X;yes
1981;Movie B;Studio Y;Producer Y;no
```

- **year**: Ano do filme.
- **title**: Título do filme.
- **studios**: Estúdio que produziu o filme.
- **producers**: Produtores do filme (separados por vírgula ou "and").
- **winner**: Indica se o filme foi vencedor (`yes` ou `no`).

---

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

---

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## Contato

Se tiver alguma dúvida ou sugestão, entre em contato:

- **Nome**: Heverton L. Roieski
- **Email**: hevertonlr@gmail.com
- **GitHub**: [hevertonlr](https://github.com/hevertonlr)

---

### Melhorias Futuras

- Adicionar autenticação e autorização.
- Implementar paginação e filtros para consultas.
- Adicionar suporte a outros formatos de importação (JSON, XML).
