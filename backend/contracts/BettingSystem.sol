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
        uint256 totalAmount;
        mapping(string => uint256) outcomes;
        Bet[] bets;
        bool closed;
        string result;
    }

    Event[] public events;

    function createEvent(string memory description) public {
        Event storage newEvent = events.push();
        newEvent.description = description;
        newEvent.closed = false;
    }

    function placeBet(uint256 eventId, string memory choice) public payable {
        require(eventId < events.length, "Event does not exist");
        Event storage betEvent = events[eventId];
        require(!betEvent.closed, "Event is closed");
        betEvent.totalAmount += msg.value;
        betEvent.outcomes[choice] += msg.value;
        betEvent.bets.push(Bet(msg.sender, msg.value, choice));
    }

    function closeEvent(uint256 eventId, string memory result) public {
        require(eventId < events.length, "Event does not exist");
        Event storage betEvent = events[eventId];
        require(!betEvent.closed, "Event already closed");
        betEvent.result = result;
        betEvent.closed = true;

        for (uint256 i = 0; i < betEvent.bets.length; i++) {
            Bet storage bet = betEvent.bets[i];
            if (keccak256(abi.encodePacked(bet.choice)) == keccak256(abi.encodePacked(result))) {
                payable(bet.user).transfer(bet.amount * betEvent.totalAmount / betEvent.outcomes[result]);
            }
        }
    }
}