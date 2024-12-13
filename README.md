# Relatório PBL 3 - TEC 502 - MI-Concorrência e Conectividade
Antônio Felipe Ferreira de Jesus Moreira

UEFS - 13 de dezembro de 2024

email: felipetompsomf18@gmail.com
# Resumo(Abstract):
Este relatório apresenta o desenvolvimento de um sistema de apostas online descentralizado utilizando tecnologia de ledger distribuído (DLT) baseado em Ethereum. A solução elimina intermediários tradicionais, promovendo transparência, resistência a bloqueios governamentais e descentralização. O backend foi implementado em Python, com um frontend desenvolvido em React, integrados à blockchain simulada pelo Ganache. Este documento detalha a fundamentação teórica, metodologia e conclusões obtidas.
# Introdução:
A centralização em sistemas de apostas online tradicionais pode introduzir problemas como manipulações, taxas elevadas e suscetibilidade a restrições governamentais. Este projeto visa implementar um sistema descentralizado para apostas online, permitindo algumas funcionalidades, como cadastro e participação em eventos, transparência nos resultados, garantida por uma blockchain, resiliência a bloqueios governamentais. A tecnologia de ledger distribuído (DLT) foi escolhida devido à sua capacidade de armazenar informações de forma imutável e distribuída.
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