pragma solidity ^0.4.24;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import './Portfolio.sol';
import "zeppelin-solidity/contracts/math/SafeMath.sol";

contract PortfolioData is Ownable, Portfolio {
    using SafeMath for uint256;
    event CreatedCommitment(address indexed userAccount, Commitment valueSet, address indexed authorisingAccount);
    event DeletedCommitment(address indexed userAccount, address indexed authorisingAccount);

    event CreatedAllocation(address indexed userAccount, Allocation[] valueSet, address indexed authorisingAccount);
    event DeletedAllocation(address indexed userAccount, address indexed authorisingAccount);

    mapping(address => Allocation[]) public user_allocations;
    mapping(address => uint) public user_allocation_size;
    mapping(address => Commitment) public user_commitment;

    function createNewUserCommitment(address _userAddress,
        Period period,
        uint256 amountToPay,
        uint256 durationInYears,
        uint256 aktStake,
        uint createdAt) public onlyOwner {
        Commitment memory commitment = Commitment(period, amountToPay, durationInYears, aktStake, createdAt);
        user_commitment[_userAddress] = commitment;
        emit CreatedCommitment(_userAddress, commitment, msg.sender);
    }

    function createNewUserAllocation(address _userAddress, uint[] _percent, uint[] _eth, address[] _fund) public onlyOwner {
        require(_percent.length == _eth.length && _percent.length == _fund.length);
        require(_percent.length > 0, "Allocation cannot be empty");
        user_allocation_size[_userAddress] = _percent.length;
        Allocation[] memory array = new Allocation[](_percent.length);
        uint sumOfPercent = 0;
        for (uint i = 0; i < _percent.length; i++) {
            sumOfPercent += _percent[i];
            Allocation memory alc = Allocation(_percent[i], _eth[i], _fund[i]);
            user_allocations[_userAddress].push(alc);
            array[i] = alc;
        }
        require(sumOfPercent == 100);
        emit CreatedAllocation(_userAddress, array, msg.sender);
    }

    function deleteUserAllocation(address _userAddress) public onlyOwner {
        require(user_allocation_size[_userAddress] > 0, "No user allocation found");
        delete user_allocation_size[_userAddress];
        delete user_allocations[_userAddress];
        emit DeletedAllocation(_userAddress, msg.sender);
    }

    function deleteUserCommitment(address _userAddress) public onlyOwner {
        require(user_commitment[_userAddress].createdAt > 0, "No user commitment found");
        delete user_commitment[_userAddress];
        emit DeletedCommitment(_userAddress, msg.sender);
    }

}
