# Relatório PBL 3 - TEC 502 - MI-Concorrência e Conectividade
Antônio Felipe Ferreira de Jesus Moreira

UEFS - 13 de dezembro de 2024

email: felipetompsomf18@gmail.com
# Resumo(Abstract):
Este relatório apresenta o desenvolvimento de um sistema de apostas online descentralizado utilizando tecnologia de ledger distribuído (DLT) baseado em Ethereum. A solução elimina intermediários tradicionais, promovendo transparência, resistência a bloqueios governamentais e descentralização. O backend foi implementado em Python, com um frontend desenvolvido em React, integrados à blockchain simulada pelo Ganache. Este documento detalha a fundamentação teórica, metodologia e conclusões obtidas.
# Introdução:
As apostas online têm se tornado uma indústria em crescimento exponencial, atraindo milhões de usuários ao redor do mundo. Contudo, sistemas centralizados apresentam diversos desafios e limitações, incluindo:

- Intermediação excessiva: Casas de apostas centralizadas frequentemente impõem altas taxas sobre os ganhos dos usuários.

- Falta de transparência: Os cálculos das odds e o gerenciamento dos fundos são realizados em plataformas opacas, dificultando a verificação independente.

- Vulnerabilidade a bloqueios governamentais: Regulamentações locais podem impedir a operação desses sistemas em determinadas regiões.

- Riscos de manipulação: Como os resultados são frequentemente controlados por uma entidade central, existe o potencial para manipulações maliciosas.

Diante desses problemas, surge a necessidade de uma solução descentralizada que elimine intermediários, promova transparência e resiliência, e possibilite aos usuários confiar plenamente na plataforma. A descentralização através da tecnologia de ledger distribuído (DLT) oferece uma alternativa robusta e confiável para resolver esses desafios.

Este projeto visa desenvolver um sistema de apostas descentralizado baseado em blockchain, onde:

- Usuários podem criar e participar de eventos de apostas.

- Odds são calculadas dinamicamente com base na participação dos apostadores.

- Resultados e transações são transparentes e imutáveis.

A combinação de Ethereum e ferramentas como Ganache permite a implementação de contratos inteligentes para gerenciar apostas, resultados e distribuição de fundos de forma totalmente descentralizada. Este relatório detalha como o sistema foi projetado e implementado, abordando suas fundamentações teóricas, metodologia e principais resultados.
# Fundamentação teórica:
**Ethereum e Smart Contracts**

Ethereum é uma plataforma descentralizada que permite criar contratos inteligentes (smart contracts). Foi escolhida por:

- Transparência: Toda transação e código executado são públicos, permitindo auditoria por qualquer usuário.

- Resiliência: A descentralização mitiga falhas de um único ponto e aumenta a segurança contra ataques.

- Flexibilidade: Os contratos inteligentes possibilitam a criação de funcionalidades personalizáveis como cadastro de eventos, processamento de apostas e distribuição automática de ganhos.

Os contratos inteligentes são desenvolvidos em Solidity, uma linguagem de programação robusta projetada para Ethereum. Eles garantem que todas as apostas e transações sejam processadas conforme regras predefinidas, sem necessidade de intermediação humana.

**Ganache**

Ganache é uma ferramenta essencial para simulação de uma blockchain Ethereum localmente, utilizada durante o desenvolvimento e teste. Suas principais vantagens incluem:

- Rápida Configuração: Permite criar um ambiente completo de blockchain local em segundos, sem dependências externas.

- Controle Completo: Proporciona controle detalhado sobre contas, saldos, taxas de gas e transações. Isso é útil para depurar e validar interações entre o backend e os contratos inteligentes.

- Compatibilidade com ferramentas Web3: Integrado com Web3.js e Web3.py, permitindo testes e interações fluidas durante o desenvolvimento.

**Backend em Python**

O backend foi projetado para conectar o sistema à blockchain e gerenciar as interações dos usuários. As tecnologias escolhidas incluem:

- Web3: Esta biblioteca facilita a conexão com Ethereum e a interação com os contratos inteligentes. Com ela, foi possível implementar funções para registro de eventos, apostas e distribuição de recompensas.

- Flask: Framework minimalista utilizado para construir a API REST. Ele expõe endpoints para cadastro de eventos, execução de apostas, consulta de resultados e operações financeiras como depósitos e saques.

- SQLite: Banco de dados leve para persistência local de históricos de eventos e transações. Ele é usado principalmente para armazenamento fora da blockchain, reduzindo custos e otimizando consultas.

**Frontend em React**

O frontend fornece uma interface amigável para interagir com o sistema. Os principais recursos incluem:

- Reatividade e Atualizações em Tempo Real: React permite que a interface reaja instantaneamente a eventos como fechamento de apostas e mudanças de saldo.

- Modularidade: Componentes reutilizáveis foram criados para elementos como formulários de cadastro de eventos, exibição de odds dinâmicas e histórico de apostas.

- Web3.js: Biblioteca integrada ao frontend para interação direta com a blockchain. Por exemplo, a assinatura de transações é feita pelo próprio navegador do usuário usando uma carteira Ethereum como MetaMask.

**Concorrência Distribuída**

Para lidar com a concorrência distribuída, foi utilizado o algoritmo Ricart-Agrawala. Este algoritmo assegura que:

- Pedidos de Região Crítica: Cada transação que requer acesso à região crítica (como atualizações de saldos) envia solicitações para os demais nós da rede.

- Ordem de Execução: Apenas uma transação é processada por vez, respeitando a ordem dos pedidos.

- Integridade: A consistência é garantida mesmo com múltiplos usuários interagindo simultaneamente.

A implementação distribui as responsabilidades entre os nós sem a necessidade de uma autoridade central, reforçando a descentralização do sistema.
# Metodologia
**1. Backend**

**1.1 Desenvolvimento dos Smart Contracts:**

- Os contratos foram criados em Solidity para gerenciar a lógica central do sistema. Isso incluiu:

    - Cadastro de eventos com atributos como descrição, odds iniciais e status (ativo ou encerrado).

    - Registro de apostas vinculadas a eventos específicos, garantindo segurança nas transações.

    - Distribuição automática de ganhos com base nas odds dinâmicas.

**1.2 Integração com Ganache:**

- O Ganache foi configurado localmente para simular uma rede Ethereum.

- O Web3.py foi utilizado para se conectar ao Ganache e realizar operações como deploy de contratos e execução de funções.

**1.3 Exposição de Endpoints RESTful:**

- Flask foi usado para criar APIs responsáveis por:

    - Cadastro de eventos (enviando os dados ao contrato).

    - Registro de apostas (interagindo com o contrato no Ethereum).

    - Consulta de resultados e atualização do histórico de apostas.

- O SQLite armazena históricos locais de transações e usuários para referência rápida.

**1.4 Operações de Saldo:**

- Cada usuário é associado a uma conta Ethereum no Ganache.

- Depósitos e saques são realizados como transações na blockchain, garantindo rastreabilidade.

**2. Frontend**

**2.1 Interface de Cadastro e Apostas:**

- Uma interface em React foi desenvolvida para permitir que os usuários:

    - Visualizem eventos ativos e seus detalhes, incluindo odds dinâmicas.

    - Façam apostas de forma intuitiva, com validador para garantir que o saldo seja suficiente.

- Componentes reutilizáveis, como listas de eventos e modais para confirmação de apostas, foram implementados para agilidade e consistência visual.

**2.2 Consulta e Histórico:**

- Páginas para visualizar resultados passados e o histórico de apostas.

- Saldo atualizado em tempo real, sincronizado com a blockchain.

**2.3 Integração com Blockchain:**

- Web3.js foi usado para interagir diretamente com os contratos na blockchain Ethereum, possibilitando:

    - Consulta em tempo real dos dados armazenados na blockchain.

    - Envio de transações para registro de apostas e cadastro de novos eventos.

**3. Concorrência Distribuída**

**3.1 Implementação do Algoritmo Ricart-Agrawala:**

- Cada máquina participante é tratada como um nó na rede distribuída.

- Transações como registro de apostas e distribuição de ganhos são realizadas em uma região crítica protegida.

- Os nós enviam mensagens de requisição e resposta para coordenar o acesso, garantindo que apenas um processo seja executado por vez.

**3.2 Gerenciamento de Conflitos:**

- A ordem das transações é garantida pela timestamp de cada requisição.

- Logs das transações são armazenados na blockchain, garantindo auditabilidade.
# Conclusão:
O sistema descentralizado de apostas online atendeu aos requisitos de descentralização, transparência e resistência a bloqueios governamentais. Ao eliminar intermediários, o sistema reduz custos e aumenta a confiabilidade, uma vez que todas as transações e eventos são gerenciados em uma blockchain pública. A utilização de Ethereum garante transparência e imutabilidade, enquanto o Ganache permite simulação e testes eficientes antes de uma eventual implantação em uma rede principal.

No backend, Python e Web3.py forneceram as ferramentas necessárias para interagir com a blockchain, enquanto Flask facilitou a criação de APIs RESTful. A implementação do algoritmo Ricart-Agrawala garantiu consistência no processamento de transações concorrentes, essencial para um sistema distribuído. No frontend, React e Web3.js ofereceram uma interface intuitiva e responsiva, permitindo que os usuários interagissem com o sistema de forma simples e eficiente.

Além disso, o sistema demonstrou escalabilidade ao suportar o cadastro dinâmico de eventos e cálculo automático de odds baseado em valores apostados, mostrando potencial para ser expandido e adotado em casos de uso reais. Como próximos passos, seria possível explorar o uso de redes Ethereum Layer 2 para reduzir custos de transação, bem como a implementação de auditorias independentes para reforçar ainda mais a confiabilidade do sistema.