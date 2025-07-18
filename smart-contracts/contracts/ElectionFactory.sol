// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ElectionFactory {
    uint public electionCount;

    struct Election {
        uint id;
        string name;
        string description;
        uint startDate;
        uint endDate;
        string bannerUrl;
        address createdBy;
        uint createdAt;
    }

    mapping(uint => Election) public elections;

    event ElectionCreated(
        uint indexed id,
        string name,
        string description,
        uint startDate,
        uint endDate,
        string bannerUrl,
        address indexed createdBy,
        uint createdAt
    );

    function createElection(
        string memory _name,
        string memory _description,
        uint _startDate,
        uint _endDate,
        string memory _bannerUrl
    ) public {
        require(_startDate < _endDate, "Start date must be before end date");
        require(_startDate > block.timestamp, "Start date must be in the future");

        electionCount++;
        uint electionId = electionCount;
        uint timestamp = block.timestamp;

        elections[electionId] = Election({
            id: electionId,
            name: _name,
            description: _description,
            startDate: _startDate,
            endDate: _endDate,
            bannerUrl: _bannerUrl,
            createdBy: msg.sender,
            createdAt: timestamp
        });

        emit ElectionCreated(
            electionId,
            _name,
            _description,
            _startDate,
            _endDate,
            _bannerUrl,
            msg.sender,
            timestamp
        );
    }

    function getElection(uint _id) public view returns (Election memory) {
        return elections[_id];
    }
}
