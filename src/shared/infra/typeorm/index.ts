import { createConnection } from 'typeorm';

 createConnection().then(() => 'Conected to the database.');

   /**
   * Essa função por padrão busca o arquivo de configuração ormconfig.json
   * que por sua vez contem as credencias necessárias para realiar a conexão
   * entre a aplicação e o banco de dados.
   */

