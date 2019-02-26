var web3 = new Web3(web3.currentProvider);

var abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"}]')
var VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
var contractInstance = VotingContract.at('0xd4304c12b282a3177e0ddb86c11473333717dd48');

var candidates = { "Chi": "candidate-1", "Jonas": "candidate-2", "Johan": "candidate-3" }

$(document).ready(function () {
  var candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    contractInstance.totalVotesFor.call(name, function (error, result) {
      $("#" + candidates[name]).html(result.c[0]);
    });
  }
});

function voteForCandidate() {
  candidateName = $("#candidate").val();

  contractInstance.voteForCandidate(candidateName, { from: web3.eth.accounts[0] }, function () {
    window.location.reload();
  });
}