// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BettingSystem {
    struct Bet {
        address user;
        uint256 amount;
        string choice;
    }

    struct Event {
        string description;
        string sideA;
        string sideB;
        uint256 oddsA;
        uint256 oddsB;
        uint256 totalAmount;
        mapping(string => uint256) outcomes; // Valor total apostado por opção
        Bet[] bets;
        bool closed;
        string result;
    }

    Event[] public events;

    event EventCreated(uint256 eventId, string description, string side, string sideB, uint256 oddsA, uint256 oddsB);
    event BetPlaced(uint256 eventId, address indexed user, uint256 amount, string choice);
    event EventClosed(uint256 eventId, string result);

    // Cria um novo evento de aposta
    function createEvent(
        string memory description,
        string memory sideA,
        string memory sideB,
        uint256 oddsA,
        uint256 oddsB
    ) public {
        require(oddsA > 0 && oddsB > 0, "Odds devem ser maiores que zero");
        Event storage newEvent = events.push();
        newEvent.description = description;
        newEvent.sideA = sideA;
        newEvent.sideB = sideB;
        newEvent.oddsA = oddsA;
        newEvent.oddsB = oddsB;
        newEvent.closed = false;

        emit EventCreated(events.length - 1, description, sideA, sideB, oddsA, oddsB);
    }

    // Realiza uma aposta em um evento
    function placeBet(uint256 eventId, string memory choice) public payable {
        require(eventId < events.length, "Evento nao existe");
        Event storage betEvent = events[eventId];
        require(!betEvent.closed, "Evento fechado");
        require(
            keccak256(abi.encodePacked(choice)) == keccak256(abi.encodePacked(betEvent.sideA
)) ||
            keccak256(abi.encodePacked(choice)) == keccak256(abi.encodePacked(betEvent.sideB)),
            "Escolha invalida"
        );
        require(msg.value > 0, "Valor da aposta deve ser maior que zero");

        betEvent.totalAmount += msg.value;
        betEvent.outcomes[choice] += msg.value;
        betEvent.bets.push(Bet(msg.sender, msg.value, choice));

        emit BetPlaced(eventId, msg.sender, msg.value, choice);
    }

    // Fecha um evento e calcula os ganhos dos vencedores
    function closeEvent(uint256 eventId, string memory result) public {
        require(eventId < events.length, "Evento nao existe");
        Event storage betEvent = events[eventId];
        require(!betEvent.closed, "Evento ja fechado");
        require(
            keccak256(abi.encodePacked(result)) == keccak256(abi.encodePacked(betEvent.sideA
)) ||
            keccak256(abi.encodePacked(result)) == keccak256(abi.encodePacked(betEvent.sideB)),
            "Resultado invalido"
        );

        betEvent.result = result;
        betEvent.closed = true;

        uint256 winningPool = betEvent.outcomes[result];
        if (winningPool > 0) {
            for (uint256 i = 0; i < betEvent.bets.length; i++) {
                Bet storage bet = betEvent.bets[i];
                if (keccak256(abi.encodePacked(bet.choice)) == keccak256(abi.encodePacked(result))) {
                    uint256 payout = (bet.amount * betEvent.totalAmount) / winningPool;
                    payable(bet.user).transfer(payout);
                }
            }
        }

        emit EventClosed(eventId, result);
    }

    // Retorna a quantidade total de eventos criados
    function getTotalEvents() public view returns (uint256) {
        return events.length;
    }
}
